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
const database_1 = __importDefault(require("./database"));
// import express, { Request, Response } from "express";
// Initialize QuikDB instance
let quikdb = new sdk_1.QuikDB();
function createSchema() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield quikdb.init();
            const owner = yield (0, database_1.default)();
            console.log(`${owner} verified!`);
            const deleteSchemaArgs = ['UserSchema'];
            const deleteSchemaResult = yield quikdb.callCanisterMethod(sdk_1.CanisterMethod.DeleteSchema, deleteSchemaArgs);
            if (deleteSchemaResult) {
                console.log('Schema deleted successfully.');
            }
            else {
                console.error(`Error: ${deleteSchemaResult}`);
            }
            // Define schema details
            const schemaName = 'UserSchema';
            const fields = [
                { name: 'username', unique: false, fieldType: 'Text' },
                { name: 'age', unique: false, fieldType: 'Int' },
                { name: 'email', unique: true, fieldType: 'Text' },
                { name: 'password', unique: true, fieldType: 'Text' },
                { name: 'rescue', unique: true, fieldType: 'Text' },
                { name: 'res', unique: true, fieldType: 'Text' },
            ];
            const indexes = ['email'];
            // Create schema
            const args = [schemaName, fields, indexes];
            const createResult = yield quikdb.callCanisterMethod(sdk_1.CanisterMethod.CreateSchema, args);
            console.log('Create Schema Result:', createResult);
            // Retrieve schema
            const getSchemaArgs = [schemaName];
            const schema = yield quikdb.callCanisterMethod(sdk_1.CanisterMethod.GetSchema, getSchemaArgs);
            console.log('Retrieved Schema:', schema);
        }
        catch (error) {
            console.log("Error ", error);
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield createSchema();
}))();
