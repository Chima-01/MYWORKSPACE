import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { getAllBooks } from './controller/book_controller';
import { createAllSchema, deleteAllSchema } from './miidle_ware/utils';
import GetOwner from "./database/database";
import bookRoute from "./routes/book_routes"
import userRoute from "./routes/user_routes"

const app = express();
config();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.get('/', getAllBooks);
// app.use('/user', bookRoutes);
// app.use('/book', userRoutes);



app.listen(port, async () => {
  console.log(`Server is listening on port ${port}`);
  await createAllSchema;
  const owner = await GetOwner();
  console.log(`${owner}`);
});

process.on("SIGINT", async () => await deleteAllSchema);
process.on("SIGTERM", async () => await deleteAllSchema); 