import { userSchema, bookSchema } from "../schema_models";
import { QuikDB, CanisterMethod, DeleteSchemaArgs, ResultBool } from 'quikdb-cli-beta/v1/sdk';

const quikdb = new QuikDB();
(async () => await quikdb.init())();
const schemas = [
  { name: "UserSchema", fn: userSchema },
  { name: "BookSchema", fn: bookSchema },
];


export const createAllSchema = async () => {
  try {
    schemas.map(async (schema) => {
        const result: ResultBool = await schema.fn();
        if ("ok" in result) {
          console.log(`------- ${schema.name} has been created successfully! ------`); 
        } else {
          console.log(`------ ${schema.name} already exist ------- `);
        }
      }
  );
  } catch (err) {
    console.log('An error occured schema wasn\'t created!: ', err);
  }
  // const result: ResultBool = await userSchema();
  // if ("ok" in result) {
  //   console.log(`userschema created!`);
  // } else {
  //   console.log(`An error occured in creating user schema`);
  // }

  // const bookSchemaResult: ResultBool = await bookSchema();
  // if ("ok" in bookSchemaResult) {
  //   console.log("book schema has been created!")
  // }

}

export const deleteAllSchema = async () => {

  try {
    schemas.map(async (schema) => {
      const deleteSchemaArgs: DeleteSchemaArgs = [schema.name];
      const deleteSchemaResult: ResultBool = await quikdb.callCanisterMethod(CanisterMethod.DeleteSchema, deleteSchemaArgs);

      if ("ok" in deleteSchemaResult) {
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

export const convertToObject = (id: string, arr: [string, string][] ): { [key: string]: any } => {
  const obj: { [key: string]: any } = {};
  obj["id"] = id;
  
  for (let i = 0; i < arr.length; i++) {
    let [key, value] = arr[i];
    obj[key] = value;
  }

  return obj;
};
