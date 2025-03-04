import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { getAllBooks, searchBooks } from './controller/book_controller';
import { createAllSchema, deleteAllSchema } from './miidle_ware/utils';
import bookRoute from "./routes/book_routes"
import GetOwner from "./database/database";
import userRoute from "./routes/user_routes"

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.get('/api/books', getAllBooks);
app.get('/api/search', searchBooks);
app.use('/user', bookRoute);
app.use('/user/userId/book', userRoute);



app.listen(port, async () => {
  console.log(`Server is listening on port ${port}`);
  const owner = await GetOwner();
  await createAllSchema();
  console.log(`${owner}`);
});

// process.on("SIGINT", async () => {
//   try {
//   await deleteAllSchema()
//   } catch (err) { 
//     console.log(`Error: ${err}`);
//   }
// });

// process.on("SIGTERM", async () => {  try {
//   await deleteAllSchema()
//   } catch (err) { 
//     console.log(`Error: ${err}`);
//   }});