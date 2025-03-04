import { query, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { 
  QuikDB, CanisterMethod, SearchByIndexArgs,
  GetAllRecordsArgs, ResultRecords, CreateRecordDataArgs,
  DeleteDataArgs, ResultBool, DBRecord 
} from 'quikdb-cli-beta/v1/sdk';
import * as EmailValidator from 'email-validator';
import bcrypt from "bcrypt";
import { v4 as uuidv4, validate } from 'uuid';
import { convertToObject } from "../miidle_ware/utils"; 
 
const quikdb = new QuikDB();
(async () => await quikdb.init())();

const schemaName = 'UserSchema';
const fields = ["firstname", "lastname", "email", "password"];
const saltRounds = 10;
const secretKey = process.env.SECRET_KEY as string;

export const signup = async (req: Request, res: Response): Promise<any> => {
  const data: { [key: string]: any } = req.body;
  const missingField = fields.filter((field) => data[field] === '' || data[field] === undefined);
  
  if (missingField.length > 0) {
    return res.status(400).json({ 
      success: false,
      error: `Field required ${missingField.join(', ')}`
    });
  }

  try {
    const { firstname, lastname, email, password } = req.body;

    if (!EmailValidator.validate(email)) {
      return res.status(401).json({ success: false, error: `Please Provide a valid email address!`});
    }

    const salt = await bcrypt.genSaltSync(saltRounds );
    const hashPassword = await bcrypt.hashSync(password, salt);
    const id = uuidv4();
    
    const record: DBRecord = {
      id,
      fields: [
        ['firstname', firstname],
        ['lastname', lastname],
        ['email', email],
        ['password', hashPassword],
        ['Role', 'User']
      ],
    };
  
      const createRecordArgs: CreateRecordDataArgs = [schemaName, record];
      const insertResult: ResultBool = await quikdb.callCanisterMethod(CanisterMethod.CreateRecordData, createRecordArgs);
      if ("ok" in insertResult) {
        console.log('Record inserted successfully.');
        return res.status(201).json({success: false, data: id });
      }
      console.log(insertResult.err);
      return res.status(401).json({ success: false, error: `${insertResult.err}` });
    } catch (err) {
      res.status(500).json({ success: false, error: `Server Error!`});
    }
}

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  if (!password || password === undefined) {
    return res.status(400).json({ success: false, error: `Password field required!` });
  }

  const searchByIndexArgs: SearchByIndexArgs = [schemaName, 'email', email];
  const searchResult: ResultRecords = await quikdb.callCanisterMethod(CanisterMethod.SearchByIndex, searchByIndexArgs);

  if ("ok" in searchResult) {
    const user = searchResult.ok[0];
    const data = convertToObject(user.id, user.fields);
    const hashPassword = data["password"];
    const match = bcrypt.compareSync(password, hashPassword);

    if (!match) {
      return res.status(401).json({ success: false, error: `Incorrect password!`});
    }
    const token =  jwt.sign({ id: user.id, role: 'user' }, secretKey, {
    expiresIn: '2 days' });
    return res.status(200).json({ success: true, data, token, });
  }

  return res.status(404).json({ success: false, error: `email not recognised` });
}

export const allUsers = async (req: Request, res: Response): Promise<any> => {
   const getAllRecordsArgs: GetAllRecordsArgs = [schemaName];
    const allRecords: ResultRecords = await quikdb.callCanisterMethod(CanisterMethod.GetAllRecords, getAllRecordsArgs);
    const filterData: { [key: string]: any }[] = [];
  
    if ("ok" in allRecords) {
      for (let i = 0; i < allRecords.ok.length; i++) {
        let details = allRecords.ok[i]; 
        let obj = convertToObject(details.id, details.fields);
        filterData.push(obj);
      }
      return res.status(200).json({success: true, data: filterData });
    }
      console.log(`${allRecords.err}`);
      return res.status(404).json({ success: false, error: `No user found!` });
}

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  const { Id } = req.params;

    if (!validate(Id)) {
      return res.status(400).json({ success: false, error: `${Id} not valid!`});
    }
  
    const deleteDataArgs: DeleteDataArgs = [schemaName, Id];
    const deleteResult: ResultBool = await quikdb.callCanisterMethod(CanisterMethod.DeleteRecord, deleteDataArgs);
  
   if ("ok" in deleteResult) {
     console.log('Record deleted successfully.');
     return res.status(200).json({ success: true, data: `${Id} deleted successfully!` });
   }
  
    console.log(`${deleteResult}`);
    return res.status(404).json({ success: false, error: `${Id}: ${deleteResult.err}`});
}