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
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
// import express, { Request, Response } from "express";
// Initialize QuikDB instance
let quikdb = new sdk_1.QuikDB();
fs_1.default.readFile('./src/database/books.txt', 'utf8', (err, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (err) {
        console.error(err);
        return;
    }
    yield quikdb.init();
    const owner = yield (0, database_1.default)();
    console.log(`${owner} verified!`);
    const book_data = JSON.parse(data);
    for (let i = 0; i < book_data.length; i++) {
        console.log(book_data[i]);
        yield createBook(book_data[i]);
    }
}));
const createBook = (field) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, genre, available_copies, published_year, isbn } = field;
    const id = (0, uuid_1.v4)();
    const record = {
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
    const createRecordArgs = ['BookSchema', record];
    const insertResult = yield quikdb.callCanisterMethod(sdk_1.CanisterMethod.CreateRecordData, createRecordArgs);
    if ("ok" in insertResult) {
        console.log(`Record: ${record} successfully!`);
    }
    else {
        console.error(`Error: ${insertResult}`);
    }
});
