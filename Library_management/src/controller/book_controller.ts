import { query, Request, Response } from "express";
import { 
  QuikDB, CanisterMethod, UpdateDataArgs, SearchByIndexArgs,
  GetAllRecordsArgs, ResultRecords, CreateRecordDataArgs,
  DeleteDataArgs, ResultBool, DBRecord, SearchByMultipleFieldsArgs 
} from 'quikdb-cli-beta/v1/sdk';
import { v4 as uuidv4, validate } from 'uuid';
import { convertToObject } from "../miidle_ware/utils"; 
 
const quikdb = new QuikDB();
(async () => await quikdb.init())();

const schemaName = 'BookSchema';
const fields = ["title", "author", "genre", "available_copies", "published_year", "isbn"];


export const getAllBooks = async (req: Request, res: Response): Promise<any> => {
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
  } else {
    console.log(`${allRecords.err}`);
    res.status(404).json({ success: false, error: `Books not found!` });
  }
}


export const getBook = async (req: Request, res: Response): Promise<any> => {
  const { bookId } = req.params;

  if (!validate(bookId)) {
    return res.status(400).json({ success: false, data: `${bookId} not valid!`});
  }

  const getAllRecordsArgs: GetAllRecordsArgs = [schemaName];
  const allRecords: ResultRecords = await quikdb.callCanisterMethod(CanisterMethod.GetAllRecords, getAllRecordsArgs);
  if ("ok" in allRecords) {
    const index = allRecords.ok.findIndex((elem) => {
      return elem.id === bookId;
    });

    if (index === -1) {
      return res.status(404).json({ success: false, error: `${bookId} not found!` });
    }
    const book = convertToObject(allRecords.ok[index].id, allRecords.ok[index].fields);
    return res.status(200).json({ success: true, data: book});
  } else {
    console.log(`Error: ${allRecords.err}`);
    return res.status(500).json({ success: false, error: `Server Error` });
  }
}

export const createBook = async(req: Request, res: Response): Promise<any> => {
  const missingField = fields.filter((field) => !req.body[field]);
  
  if (missingField.length > 0) {
    return res.status(400).json({ 
      success: false,
      error: `The following fields are required ${missingField.join(', ')}`
    });
  }

  try {
    const { title, author, genre, available_copies, published_year, isbn } = req.body;
    const id = uuidv4();
  
    const record: DBRecord = {
      id,
      fields: [
        ['title', title.toLocaleLowerCase()],
        ['author', author.toLocaleLowerCase()],
        ['genre', genre.toLocaleLowerCase()],
        ['available_copies', String(available_copies)],
        ['published_year', String(published_year)],
        ['isbn', isbn]
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

export const updateBook = async(req: Request, res: Response): Promise<any> => {
  try {
    const { bookId } = req.params;

    if (!validate(bookId)) {
      return res.status(400).json({ success: false, error: `${bookId} not valid!`});
    }

    const data: { [key: string]: any } = req.body;
    const updatedFields: [string, string][] = fields
    .filter(field => data[field])
    .map(field => [field, String(data[field])]);

    const updateDataArgs: UpdateDataArgs = [schemaName, bookId, updatedFields];
    const updateResult: ResultBool = await quikdb.callCanisterMethod(CanisterMethod.UpdateData, updateDataArgs);

    if ("ok" in updateResult) {
      console.log('Record updated successfully.');
      return res.status(201).json({ success: true, data: `${bookId} updated successfully!`});
    }

     console.error(`Error: ${updateResult.err}`);
     return res.status(500).json({ success: false, data: `${bookId} wasn't updated`});
  } catch (error) {
    return res.status(500).json({ success: false, error: `An Error occured in server: ${error}` });
  }
  }

export const deleteBook = async(req: Request, res: Response): Promise<any> => {
  const { bookId } = req.params;

  if (!validate(bookId)) {
    return res.status(400).json({ success: false, error: `${bookId} not valid!`});
  }

  const deleteDataArgs: DeleteDataArgs = [schemaName, bookId];
  const deleteResult: ResultBool = await quikdb.callCanisterMethod(CanisterMethod.DeleteRecord, deleteDataArgs);

 if ("ok" in deleteResult) {
   console.log('Record deleted successfully.');
  return res.status(200).json({ success: true, data: `${bookId} deleted successfully!` });
 }

  console.log(`${deleteResult}`);
  return res.status(404).json({ success: false, error: `${bookId}: ${deleteResult.err}`});
}

export const searchBooks = async(req: Request, res: Response): Promise<any> => {
  try {
    const searchQuery = ["title", "author", "genre"];
    const query = req.query;

    const getQuery: [string, string][] = searchQuery
    .filter((index) => query[index] !== undefined)
    .map(index => [index, String(query[index]).toLocaleLowerCase() || ""]);

    console.log(getQuery);
    if (getQuery.length === 0) {
      return res.status(400).json({ success: false, error: `Query not recognised`})
    }

    if (getQuery.length === 1 && getQuery[0][0] === "title") {
      const searchByIndexArgs: SearchByIndexArgs = [schemaName, 'title', getQuery[0][1]];
      const searchResult: ResultRecords = await quikdb.callCanisterMethod(CanisterMethod.SearchByIndex, searchByIndexArgs);

      if ("ok" in searchResult) {
        const queryResult = searchResult.ok;
        const data: Record<string, any> = [];
        for (let i = 0; i < queryResult.length; i++) {
          let obj = convertToObject(queryResult[i].id, queryResult[i].fields);
          data.push(obj);
       }
       return res.status(200).json({ success: true, data, });
      }
    return res.status(404).json({ success: false, error: `${searchResult.err}`});
  }

  if (getQuery.length > 0) {
    const searchByMultipleFieldsArgs: SearchByMultipleFieldsArgs = [
      schemaName,
      getQuery,
    ];
    const searchMultipleResult: ResultRecords = await quikdb.callCanisterMethod(
      CanisterMethod.SearchByMultipleFields,
      searchByMultipleFieldsArgs
    );
  
    if ("ok" in searchMultipleResult) {
    //   const records = searchMultipleResult.ok.map((record) => {
    //     convertToObject(record.id, record.fields);
    // });
    const queryResult = searchMultipleResult.ok;
    const data: Record<string, any> = [];
    for (let i = 0; i < queryResult.length; i++) {
      let obj = convertToObject(queryResult[i].id, queryResult[i].fields);
      console.log(obj);
      data.push(obj);
    }
      return res.status(200).json({ success: true, data, });
    } else {
      console.log(`Error: ${searchMultipleResult.err}`);
      return res.status(404).json({ success: false, data: `${searchMultipleResult.err}`})
    }
  }
} catch (error) {
  return res.status(400).json({ success: false, error, });
}
}