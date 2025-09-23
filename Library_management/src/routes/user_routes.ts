import { Router } from "express";
import { signup, login, allUsers, deleteUser } from "../controller/user_controller";
import { verifyUser, verifyAdmin } from '../miidle_ware/verify_user'

const router = Router();

router.get('/', verifyAdmin, allUsers);
router.post('/signup', signup);
router.post('/login', login);
router.delete('/delete/:Id', verifyAdmin, deleteUser);

export default router;