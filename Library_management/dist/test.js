"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("quikdb-cli-beta/v1/sdk");
const database_1 = __importDefault(require("./database/database"));
const utils_1 = require("./miidle_ware/utils");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import express, { Request, Response } from "express";
// Initialize QuikDB instance
let quikdb = new sdk_1.QuikDB();
function createSchema() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield quikdb.init();
            const owner = yield (0, database_1.default)();
            console.log(`${owner} verified!`);
            //  // Define schema details
            //  const schemaName = 'UserSchema';
            //     const fields = [
            //       { name: 'username', unique: false, fieldType: 'Text' },
            //       { name: 'age', unique: false, fieldType: 'Int' },
            //       { name: 'email', unique: true, fieldType: 'Text' },
            //     ];
            //     const indexes = ['email'];
            //     // Create schema
            //     const args: CreateSchemaArgs = [schemaName, fields, indexes];
            //     const createResult = await quikdb.callCanisterMethod(CanisterMethod.CreateSchema, args);
            //     console.log('Create Schema Result:', createResult);
            //   // // Retrieve schema
            //   const record: DBRecord = {
            //     id: 'record1',
            //     fields: [
            //       ['username', 'testuser'],
            //       ['age', '30'],
            //       ['email', 'testuser@example.com'],
            //     ],
            //   };
            //   const createRecordArgs: CreateRecordDataArgs = [schemaName, record];
            //   const insertResult: ResultBool = await quikdb.callCanisterMethod(CanisterMethod.CreateRecordData, createRecordArgs);
            //   if (insertResult) {
            //     console.log('Record inserted successfully.');
            //     console.log({ insertResult });
            //   } else {
            //     console.error(`Error: ${insertResult}`);
            //   }
            //   const deleteSchemaArgs: DeleteSchemaArgs = ['UserSchema'];
            //   const deleteSchemaResult: ResultBool = await quikdb.callCanisterMethod(CanisterMethod.DeleteSchema, deleteSchemaArgs);
            //   if (deleteSchemaResult) {
            //     console.log('Schema deleted successfully.');
            //   } else {
            //     console.error(`Error: ${deleteSchemaResult}`);
            //   }
            //   const getAllRecordsArgs: GetAllRecordsArgs = ['UserSchema'];
            //   const allRecords: ResultRecords = await quikdb.callCanisterMethod(CanisterMethod.GetAllRecords, getAllRecordsArgs);
            //   if ("ok" in allRecords) {
            //     // const fields = allRecords.ok[0].fields;
            //     // const filteredData = fields.filter((data) =>  (data[0] !== 'update_timestamp'  &&  data[0] !== 'creation_timestamp'));
            //     const filterData = convertToObject(allRecords.ok[0].id, allRecords.ok[0].fields);
            //     console.log(filterData);
            //     console.log(allRecords);
            //     // console.log(JSON.stringify(allRecords.ok, null, 2));
            //     //console.log("allRecords:", JSON.stringify(allRecords, null, 2));
            //    } else {
            //       console.log(`Error: ${allRecords.err}`);
            //   }
            //   if ("ok" in allRecords) {
            //     const index = allRecords.ok.findIndex((elem) => {
            //       return elem.id === 'record1';
            //     });
            //     if (index === -1) {
            //       console.log("record was not found");
            //     }
            //     const book = convertToObject(allRecords.ok[index].id, allRecords.ok[index].fields);
            //     console.log('book result: ', book);
            //   }
            // const searchByIndexArgs: SearchByIndexArgs = [schemaName, 'email', 'testuser@example.com']; 
            // const searchResult: ResultRecords = await quikdb.callCanisterMethod(CanisterMethod.SearchByIndex, searchByIndexArgs);
            // if ("ok" in searchResult) {
            //   searchResult.ok.forEach(record => console.log(record));
            // } else {
            //   console.error(`Error: ${searchResult.err}`);
            // }
            //   const getSchemaArgs: GetSchemaArgs = [schemaName];
            //   const schema = await quikdb.callCanisterMethod(CanisterMethod.GetSchema, getSchemaArgs);
            //   console.log('Retrieved Schema:', schema);
            // const getRecordArgs: GetRecordArgs = [schemaName, 'record1'];
            // const recordResult: ResultString = await quikdb.callCanisterMethod(CanisterMethod.GetRecord, getRecordArgs);
            // if (recordResult) {
            //   console.log('Record Details:', recordResult);
            // } else {
            //   console.error(`Error: ${recordResult}`);
            // }
            const searchByMultipleFieldsArgs = [
                'BookSchema',
                [
                    ["author", "cormac mccarthy"]
                ],
            ];
            const searchMultipleResult = yield quikdb.callCanisterMethod(sdk_1.CanisterMethod.SearchByMultipleFields, searchByMultipleFieldsArgs);
            if ("ok" in searchMultipleResult) {
                console.log(searchMultipleResult);
                //   const records = searchMultipleResult.ok.map((record) => {
                //     convertToObject(record.id, record.fields);
                // });
                const queryResult = searchMultipleResult.ok;
                console.log(queryResult);
                const data = [];
                for (let i = 0; i < queryResult.length; i++) {
                    let obj = (0, utils_1.convertToObject)(queryResult[i].id, queryResult[i].fields);
                    console.log(obj);
                    data.push(obj);
                }
                console.log(data);
            }
            else {
                console.log(`Error: ${searchMultipleResult.err}`);
            }
            const [firstname, lastname, email, password] = ["Divine", "Chima", "divine@google.com", "12345"];
            const salt = yield bcrypt_1.default.genSaltSync(10);
            const hashPassword = yield bcrypt_1.default.hashSync(password, salt);
            const id = (0, uuid_1.v4)();
            const record = {
                id,
                fields: [
                    ['firstname', firstname],
                    ['lastname', lastname],
                    ['email', email],
                    ['password', hashPassword],
                    ['Role', 'Admin']
                ],
            };
            const secretKey = 'quikdblibrarymanagement';
            const createRecordArgs = ['UserSchema', record];
            const insertResult = yield quikdb.callCanisterMethod(sdk_1.CanisterMethod.CreateRecordData, createRecordArgs);
            if ("ok" in insertResult) {
                console.log('Record inserted successfully.');
                const token = jsonwebtoken_1.default.sign({ id, role: 'admin' }, secretKey, {
                    expiresIn: '2 days'
                });
                console.log(`jwt: ${token}`);
            }
        }
        catch (error) {
            console.log("Error ", error);
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield createSchema();
}))();
// interface data_type {
//     title: string;
//     author: string;
//     genre: string;
//     available_copies: string;
//     published_year: string;
//     isbn: string;
// }
// fs.readFile('./src/database/books.txt', 'utf8', async (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   await quikdb.init();
//   const owner = await GetOwner();
//   console.log(`${owner} verified!`);
//   const book_data: data_type[] = JSON.parse(data);
//   for (let i = 0; i < book_data.length; i++) {
//     console.log(book_data[i]);
//     await createBook(book_data[i]);
//   }
// });
// const createBook = async (field: data_type ): Promise<void> => {
//   const { title, author, genre, available_copies, published_year, isbn } = field;
//   const id = uuidv4();
//   const record: DBRecord = {
//     id,
//     fields: [
//       ['title', title],
//       ['author', author.toLocaleLowerCase()],
//       ['genre', genre.toLocaleLowerCase()],
//       ['available_copies', String(available_copies)],
//       ['published_year', String(published_year)],
//       ['isbn', isbn]
//     ],
//   };
//   const createRecordArgs: CreateRecordDataArgs = ['BookSchema', record];
//   const insertResult: ResultBool = await quikdb.callCanisterMethod(CanisterMethod.CreateRecordData, createRecordArgs);
//   if ("ok" in insertResult) {
//     console.log(`Record: ${record} successfully!`);
//   } else {
//     console.error(`Error: ${insertResult}`);
//   }
// }
