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
exports.bookSchema = exports.userSchema = void 0;
const sdk_1 = require("quikdb-cli-beta/v1/sdk");
const quikdb = new sdk_1.QuikDB();
(() => __awaiter(void 0, void 0, void 0, function* () { return yield quikdb.init(); }))();
const userSchema = () => __awaiter(void 0, void 0, void 0, function* () {
    const schemaName = 'UserSchema';
    const fields = [
        { name: 'firstname', unique: false, fieldType: 'Text' },
        { name: 'lastname', unique: false, fieldType: 'Text' },
        { name: 'email', unique: true, fieldType: 'Text' },
        { name: 'password', unique: false, fieldType: 'Text' },
        { name: 'Role', unique: false, fieldType: 'Text' },
    ];
    const indexes = ['email'];
    // Create schema
    const args = [schemaName, fields, indexes];
    const createResult = yield quikdb.callCanisterMethod(sdk_1.CanisterMethod.CreateSchema, args);
    return createResult;
});
exports.userSchema = userSchema;
const bookSchema = () => __awaiter(void 0, void 0, void 0, function* () {
    yield quikdb.init();
    const schemaName = 'BookSchema';
    const fields = [
        { name: 'title', unique: false, fieldType: 'Text' },
        { name: 'author', unique: false, fieldType: 'Text' },
        { name: 'genre', unique: false, fieldType: 'Text' },
        { name: 'available_copies', unique: false, fieldType: 'Text' },
        { name: 'published_year', unique: false, fieldType: 'Text' },
        { name: 'isbn', unique: true, fieldType: 'Text' },
    ];
    const indexes = ['title'];
    // Create schema
    const args = [schemaName, fields, indexes];
    const createResult = yield quikdb.callCanisterMethod(sdk_1.CanisterMethod.CreateSchema, args);
    return createResult;
});
exports.bookSchema = bookSchema;
// const authorSchema = async () => {
//   const schemaName = 'AuthorSchema';
//     const fields = [
//       { name: 'author_name', unique: false, fieldType: 'Text' },
//       { name: 'bio', unique: false, fieldType: 'Text' },
//     ];
//     const indexes = ['Id'];
//     // Create schema
//     const args: CreateSchemaArgs = [schemaName, fields, indexes];
//     const createResult = await quikdb.callCanisterMethod(CanisterMethod.CreateSchema, args);
//     console.log('Author Schema created!');
//     return createResult;
// }
// const genreSchema = async () => {
//   const schemaName = 'GenreSchema';
//     const fields = [
//       { name: 'genre_name', unique: false, fieldType: 'Text' },
//     ];
//     const indexes = ['genre_name'];
//     // Create schema
//     const args: CreateSchemaArgs = [schemaName, fields, indexes];
//     const createResult = await quikdb.callCanisterMethod(CanisterMethod.CreateSchema, args);
//     console.log('Genre Schema created!');
//     return createResult;
// }
const borrowerSchema = () => __awaiter(void 0, void 0, void 0, function* () {
    const schemaName = 'BorrowerSchema';
    const fields = [
        { name: 'name', unique: false, fieldType: 'Text' },
        { name: 'phonenumber', unique: false, fieldType: 'Text' },
        { name: 'address', unique: false, fieldType: 'Text' }
    ];
    const indexes = ['name'];
    // Create schema
    const args = [schemaName, fields, indexes];
    const createResult = yield quikdb.callCanisterMethod(sdk_1.CanisterMethod.CreateSchema, args);
    console.log(`borrower schema created`);
    return createResult;
});
const borrowSchema = () => __awaiter(void 0, void 0, void 0, function* () {
    const schemaName = 'BorrowSchema';
    const fields = [
        { name: 'book_id', unique: false, fieldType: 'Text' },
        { name: 'borrower_id', unique: false, fieldType: 'Text' },
        { name: 'date', unique: false, fieldType: 'Text' },
        { name: 'due_date', unique: false, fieldType: 'Text' },
        { name: 'returned', unique: false, fieldType: 'Bool' }
    ];
    const indexes = ['borrower_id'];
    // Create schema
    const args = [schemaName, fields, indexes];
    const createResult = yield quikdb.callCanisterMethod(sdk_1.CanisterMethod.CreateSchema, args);
    console.log('borrow Schema created!');
    return createResult;
});
