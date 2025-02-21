import { QuikDB, CreateSchemaArgs, GetSchemaArgs, CanisterMethod, DeleteSchemaArgs, ResultBool, DBRecord, CreateRecordDataArgs, GetAllRecordsArgs,  ResultRecords } from 'quikdb-cli-beta/v1/sdk';
import GetOwner from "./database/database";
// import express, { Request, Response } from "express";

// Initialize QuikDB instance
let quikdb = new QuikDB();

async function createSchema () {
  try {
    await quikdb.init()
    const owner = await GetOwner();
    console.log(`${owner} verified!`);

    
    // const deleteSchemaArgs: DeleteSchemaArgs = ['UserSchema'];
    // const deleteSchemaResult: ResultBool = await quikdb.callCanisterMethod(CanisterMethod.DeleteSchema, deleteSchemaArgs);
    // if (deleteSchemaResult) {
    //   console.log('Schema deleted successfully.');
    // } else {
    //   console.error(`Error: ${deleteSchemaResult}`);
    // }
    
   // Define schema details
   const schemaName = 'UserSchema';
      const fields = [
        { name: 'username', unique: false, fieldType: 'Text' },
        { name: 'age', unique: false, fieldType: 'Int' },
        { name: 'email', unique: true, fieldType: 'Text' },
      ];
      const indexes = ['email'];

      // Create schema
      const args: CreateSchemaArgs = [schemaName, fields, indexes];
      const createResult = await quikdb.callCanisterMethod(CanisterMethod.CreateSchema, args);
      console.log('Create Schema Result:', createResult);
    // Retrieve schema

    const record: DBRecord = {
      id: 'record1',
      fields: [
        ['username', 'testuser'],
        ['age', '30'],
        ['email', 'testuser@example.com'],
      ],
    };
    const createRecordArgs: CreateRecordDataArgs = ['UserSchema', record];
    const insertResult: ResultBool = await quikdb.callCanisterMethod(CanisterMethod.CreateRecordData, createRecordArgs);
    if (insertResult) {
      console.log('Record inserted successfully.');
    } else {
      console.error(`Error: ${insertResult}`);
    }

    const getAllRecordsArgs: GetAllRecordsArgs = ['UserSchema'];
    const allRecords: ResultRecords = await quikdb.callCanisterMethod(CanisterMethod.GetAllRecords, getAllRecordsArgs);
    if (allRecords) {
      console.log(allRecords);
     } else {
        console.error(`Error: ${allRecords}`);
    }
    // const getSchemaArgs: GetSchemaArgs = [schemaName];
    // const schema = await quikdb.callCanisterMethod(CanisterMethod.GetSchema, getSchemaArgs);
    // console.log('Retrieved Schema:', schema);
 } catch (error) {
  console.log("Error ", error);
 }
}

(async () => {
  await createSchema();
})();