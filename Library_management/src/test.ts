import { QuikDB, CreateSchemaArgs, GetSchemaArgs, CanisterMethod, DeleteSchemaArgs, ResultBool,
  DBRecord, CreateRecordDataArgs, GetAllRecordsArgs,  ResultRecords, GetRecordArgs, 
  ResultString, SearchByIndexArgs } from 'quikdb-cli-beta/v1/sdk';
import GetOwner from "./database/database";
import { convertToObject } from "./miidle_ware/utils"; 
import fs from "fs"
import { v4 as uuidv4, validate } from 'uuid';
// import express, { Request, Response } from "express";

// Initialize QuikDB instance
let quikdb = new QuikDB();

// async function createSchema () {
//   try {
//     await quikdb.init();
//     const owner = await GetOwner();
//     console.log(`${owner} verified!`);


//    // Define schema details
//    const schemaName = 'UserSchema';
//       const fields = [
//         { name: 'username', unique: false, fieldType: 'Text' },
//         { name: 'age', unique: false, fieldType: 'Int' },
//         { name: 'email', unique: true, fieldType: 'Text' },
//       ];
//       const indexes = ['email'];

//       // Create schema
//       const args: CreateSchemaArgs = [schemaName, fields, indexes];
//       const createResult = await quikdb.callCanisterMethod(CanisterMethod.CreateSchema, args);
//       console.log('Create Schema Result:', createResult);
//     // // Retrieve schema

//     const record: DBRecord = {
//       id: 'record1',
//       fields: [
//         ['username', 'testuser'],
//         ['age', '30'],
//         ['email', 'testuser@example.com'],
//       ],
//     };

  
//     const createRecordArgs: CreateRecordDataArgs = [schemaName, record];
//     const insertResult: ResultBool = await quikdb.callCanisterMethod(CanisterMethod.CreateRecordData, createRecordArgs);
//     if (insertResult) {
//       console.log('Record inserted successfully.');
//       console.log({ insertResult });
//     } else {
//       console.error(`Error: ${insertResult}`);
//     }

        
//     const deleteSchemaArgs: DeleteSchemaArgs = ['UserSchema'];
//     const deleteSchemaResult: ResultBool = await quikdb.callCanisterMethod(CanisterMethod.DeleteSchema, deleteSchemaArgs);
//     if (deleteSchemaResult) {
//       console.log('Schema deleted successfully.');
//     } else {
//       console.error(`Error: ${deleteSchemaResult}`);
//     }
    

//     const getAllRecordsArgs: GetAllRecordsArgs = ['UserSchema'];
//     const allRecords: ResultRecords = await quikdb.callCanisterMethod(CanisterMethod.GetAllRecords, getAllRecordsArgs);
//     if ("ok" in allRecords) {
//       // const fields = allRecords.ok[0].fields;
//       // const filteredData = fields.filter((data) =>  (data[0] !== 'update_timestamp'  &&  data[0] !== 'creation_timestamp'));
//       const filterData = convertToObject(allRecords.ok[0].id, allRecords.ok[0].fields);
//       console.log(filterData);
//       console.log(allRecords);
//       // console.log(JSON.stringify(allRecords.ok, null, 2));
//       //console.log("allRecords:", JSON.stringify(allRecords, null, 2));
//      } else {
//         console.log(`Error: ${allRecords.err}`);
//     }
//     if ("ok" in allRecords) {
//       const index = allRecords.ok.findIndex((elem) => {
//         return elem.id === 'record1';
//       });
  
//       if (index === -1) {
//         console.log("record was not found");
//       }
//       const book = convertToObject(allRecords.ok[index].id, allRecords.ok[index].fields);
//       console.log('book result: ', book);
//     }

//   const searchByIndexArgs: SearchByIndexArgs = [schemaName, 'email', 'testuser@example.com']; 
//   const searchResult: ResultRecords = await quikdb.callCanisterMethod(CanisterMethod.SearchByIndex, searchByIndexArgs);
//   if ("ok" in searchResult) {
//     searchResult.ok.forEach(record => console.log(record));
//   } else {
//     console.error(`Error: ${searchResult.err}`);
//   }
  
//     const getSchemaArgs: GetSchemaArgs = [schemaName];
//     const schema = await quikdb.callCanisterMethod(CanisterMethod.GetSchema, getSchemaArgs);
//     console.log('Retrieved Schema:', schema);

//     // const getRecordArgs: GetRecordArgs = [schemaName, 'record1'];
//     // const recordResult: ResultString = await quikdb.callCanisterMethod(CanisterMethod.GetRecord, getRecordArgs);
//     // if (recordResult) {
//     //   console.log('Record Details:', recordResult);
//     // } else {
//     //   console.error(`Error: ${recordResult}`);
//     // }


//  } catch (error) {
//   console.log("Error ", error);
//  }
// }

// (async () => {
//   await quikdb.init();
// })();

interface data_type {
    title: string;
    author: string;
    genre: string;
    available_copies: string;
    published_year: string;
    isbn: string;
}

fs.readFile('./src/database/books.txt', 'utf8', async (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  await quikdb.init();
  const owner = await GetOwner();
  console.log(`${owner} verified!`);
  const book_data: data_type[] = JSON.parse(data);
  for (let i = 0; i < book_data.length; i++) {
    console.log(book_data[i]);
    await createBook(book_data[i]);
  }
});


const createBook = async (field: data_type ): Promise<void> => {
  const { title, author, genre, available_copies, published_year, isbn } = field;
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

  const createRecordArgs: CreateRecordDataArgs = ['BookSchema', record];
  const insertResult: ResultBool = await quikdb.callCanisterMethod(CanisterMethod.CreateRecordData, createRecordArgs);
  if ("ok" in insertResult) {
    console.log(`Record: ${record} successfully!`);
  } else {
    console.error(`Error: ${insertResult}`);
  }
}
