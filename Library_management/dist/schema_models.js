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
Object.defineProperty(exports, "__esModule", { value: true });
exports.genreSchema = exports.authorSchema = exports.bookSchema = exports.userSchema = void 0;
const sdk_1 = require("quikdb-cli-beta/v1/sdk");
const quikdb = new sdk_1.QuikDB();
const userSchema = () => __awaiter(void 0, void 0, void 0, function* () {
    yield quikdb.init();
    const schemaName = 'User';
    const fields = [
        { name: 'Id', unique: true, fieldType: 'Text' },
        { name: 'firstname', unique: false, fieldType: 'Text' },
        { name: 'lastname', unique: false, fieldType: 'Text' },
        { name: 'email', unique: true, fieldType: 'Text' },
        { name: 'password', unique: false, fieldType: 'Text' },
    ];
    const indexes = ['Id'];
    // Create schema
    const args = [schemaName, fields, indexes];
    const createResult = yield quikdb.callCanisterMethod(sdk_1.CanisterMethod.CreateSchema, args);
    console.log('User Schema created!');
});
exports.userSchema = userSchema;
const bookSchema = () => __awaiter(void 0, void 0, void 0, function* () {
    const schemaName = 'Book';
    const fields = [
        { name: 'Id', unique: true, fieldType: 'Text' },
        { name: 'title', unique: false, fieldType: 'Text' },
        { name: 'author_id', unique: false, fieldType: 'Text' },
        { name: 'genre_id', unique: false, fieldType: 'Text' },
        { name: 'available_copies', unique: false, fieldType: 'Int' },
        { name: 'published_year', unique: false, fieldType: 'Int' },
        { name: 'isbn', unique: false, fieldType: 'Text' },
    ];
    const indexes = ['Id'];
    // Create schema
    const args = [schemaName, fields, indexes];
    const createResult = yield quikdb.callCanisterMethod(sdk_1.CanisterMethod.CreateSchema, args);
    console.log('Book Schema created!');
});
exports.bookSchema = bookSchema;
const authorSchema = () => __awaiter(void 0, void 0, void 0, function* () {
    const schemaName = 'Author';
    const fields = [
        { name: 'Id', unique: true, fieldType: 'Text' },
        { name: 'author_name', unique: false, fieldType: 'Text' },
        { name: 'bio', unique: false, fieldType: 'Text' },
    ];
    const indexes = ['Id'];
    // Create schema
    const args = [schemaName, fields, indexes];
    const createResult = yield quikdb.callCanisterMethod(sdk_1.CanisterMethod.CreateSchema, args);
    console.log('Author Schema created!');
});
exports.authorSchema = authorSchema;
const genreSchema = () => __awaiter(void 0, void 0, void 0, function* () {
    const schemaName = 'Genre';
    const fields = [
        { name: 'Id', unique: true, fieldType: 'Text' },
        { name: 'genre_name', unique: false, fieldType: 'Text' },
    ];
    const indexes = ['Id'];
    // Create schema
    const args = [schemaName, fields, indexes];
    const createResult = yield quikdb.callCanisterMethod(sdk_1.CanisterMethod.CreateSchema, args);
    console.log('Genre Schema created!');
});
exports.genreSchema = genreSchema;
const borrowerSchema = () => __awaiter(void 0, void 0, void 0, function* () {
    const schemaName = 'Borrower';
    const fields = [
        { name: 'Id', unique: true, fieldType: 'Text' },
        { name: 'name', unique: false, fieldType: 'Text' },
        { name: 'phonenumber', unique: false, fieldType: 'Text' },
        { name: 'address', unique: false, fieldType: 'Text' }
    ];
    const indexes = ['Id'];
    // Create schema
    const args = [schemaName, fields, indexes];
    const createResult = yield quikdb.callCanisterMethod(sdk_1.CanisterMethod.CreateSchema, args);
    console.log('User Schema created!');
});
const borrowSchema = () => __awaiter(void 0, void 0, void 0, function* () {
    const schemaName = 'Borrow';
    const fields = [
        { name: 'Id', unique: true, fieldType: 'Text' },
        { name: 'book_id', unique: false, fieldType: 'Text' },
        { name: 'borrower_id', unique: false, fieldType: 'Text' },
        { name: 'date', unique: false, fieldType: 'Text' },
        { name: 'due_date', unique: false, fieldType: 'Text' },
        { name: 'returned', unique: false, fieldType: 'Bool' }
    ];
    const indexes = ['Id'];
    // Create schema
    const args = [schemaName, fields, indexes];
    const createResult = yield quikdb.callCanisterMethod(sdk_1.CanisterMethod.CreateSchema, args);
    console.log('User Schema created!');
});
