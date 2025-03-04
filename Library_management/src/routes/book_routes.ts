import { Router } from "express";
import { getAllBooks, getBook, searchBooks, createBook, updateBook, deleteBook } from "../controller/book_controller";
import { verifyUser, verifyAdmin } from '../miidle_ware/verify_user';

const router = Router();

router.get('/', getAllBooks);
router.get('/{bookId}',verifyUser, getBook);
router.post('/', verifyAdmin, createBook);
router.delete('/{bookId}',  verifyAdmin, deleteBook);
router.put('/{bookId}', verifyAdmin, updateBook);

export default router;