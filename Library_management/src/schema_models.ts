import { QuikDB, CreateSchemaArgs, CanisterMethod } from 'quikdb-cli-beta/v1/sdk';

const quikdb = new QuikDB();


export const userSchema = async () => {
  await quikdb.init();
  const schemaName = 'UserSchema';
    const fields = [
      { name: 'firstname', unique: false, fieldType: 'Text' },
      { name: 'lastname', unique: false, fieldType: 'Text' },
      { name: 'email', unique: true, fieldType: 'Text' },
      { name: 'password', unique: false, fieldType: 'Text' },
    ];
    const indexes = ['email'];
    // Create schema
    const args: CreateSchemaArgs = [schemaName, fields, indexes];
    const createResult = await quikdb.callCanisterMethod(CanisterMethod.CreateSchema, args);
    console.log('User Schema created!');
    return createResult;
}

export const bookSchema = async () => {
  const schemaName = 'BookSchema';
    const fields = [
      { name: 'title', unique: false, fieldType: 'Text' },
      { name: 'author_id', unique: false, fieldType: 'Text' },
      { name: 'genre_id', unique: false, fieldType: 'Text' },
      { name: 'available_copies', unique: false, fieldType: 'Int' },
      { name: 'published_year', unique: false, fieldType: 'Int' },
      { name: 'isbn', unique: false, fieldType: 'Text' },
    ];
    const indexes = ['title'];
    // Create schema
    const args: CreateSchemaArgs = [schemaName, fields, indexes];
    const createResult = await quikdb.callCanisterMethod(CanisterMethod.CreateSchema, args);
    console.log('Book Schema created!');
    return createResult;
}

export const authorSchema = async () => {
  const schemaName = 'AuthorSchema';
    const fields = [
      { name: 'author_name', unique: false, fieldType: 'Text' },
      { name: 'bio', unique: false, fieldType: 'Text' },
    ];
    const indexes = ['Id'];

    // Create schema
    const args: CreateSchemaArgs = [schemaName, fields, indexes];
    const createResult = await quikdb.callCanisterMethod(CanisterMethod.CreateSchema, args);
    console.log('Author Schema created!');
    return createResult;
}

export const genreSchema = async () => {
  const schemaName = 'GenreSchema';
    const fields = [
      { name: 'genre_name', unique: false, fieldType: 'Text' },
    ];
    const indexes = ['genre_name'];
    // Create schema
    const args: CreateSchemaArgs = [schemaName, fields, indexes];
    const createResult = await quikdb.callCanisterMethod(CanisterMethod.CreateSchema, args);
    console.log('Genre Schema created!');
    return createResult;
}

const borrowerSchema = async () => {
  const schemaName = 'BorrowerSchema';
    const fields = [
      { name: 'name', unique: false, fieldType: 'Text' },
      { name: 'phonenumber', unique: false, fieldType: 'Text' },
      { name: 'address', unique: false, fieldType: 'Text' }
    ];
    const indexes = ['name'];
    // Create schema
    const args: CreateSchemaArgs = [schemaName, fields, indexes];
    const createResult = await quikdb.callCanisterMethod(CanisterMethod.CreateSchema, args);
    console.log(`borrower schema created`);
    return createResult;
}

const borrowSchema = async () => {
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
    const args: CreateSchemaArgs = [schemaName, fields, indexes];
    const createResult = await quikdb.callCanisterMethod(CanisterMethod.CreateSchema, args);
    console.log('borrow Schema created!');
    return createResult;
}