import { Router } from "express";

const router = Router();

router.get('/');
router.get('/{bookId}');
router.post('/');
router.delete('/{bookId}');
router.put('/{bookId}');

export default router;