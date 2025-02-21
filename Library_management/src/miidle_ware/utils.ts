import { userSchema, bookSchema, authorSchema, genreSchema } from "../schema_models";
import { QuikDB, CanisterMethod, DeleteSchemaArgs, ResultBool } from 'quikdb-cli-beta/v1/sdk';

const quikdb = new QuikDB();
const schemas = [
  { name: "UserSchema", fn: userSchema },
  { name: "BookSchema", fn: bookSchema },
  { name: "AuthorSchema", fn: authorSchema },
  { name: "GenreSchema", fn: genreSchema },
];


export const createAllSchema = async () => {
  try {
    schemas.map(async (schema) => {
        const result: any = await schema.fn();
        if (result.ok) {
          console.log(`------- ${schema.name} has been created successfully! ------`); 
        } else {
          console.log(`------ ${schema.name} already exist ------- `);
        }
      }
  );
  } catch (err) {
    console.log('An error occured schema wasn\'t created!: ', err);
  }
}

export const deleteAllSchema = async () => {
  await quikdb.init();

  try {
    schemas.map(async (schema) => {
      const deleteSchemaArgs: DeleteSchemaArgs = [schema.name];
      const deleteSchemaResult: ResultBool = await quikdb.callCanisterMethod(CanisterMethod.DeleteSchema, deleteSchemaArgs);

      if (deleteSchemaResult) {
        console.log(`${schema.name} deleted successfully!`);
      } else {
        console.log(`Error: ${schema.name} not deleted! ------- ${deleteSchemaResult}`);
      }  
    }
  );
  } catch (err) {
    console.log('An error occured schema wasn\'t deleted!: ', err);
  }
}