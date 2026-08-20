import express from 'express';
import {login, register} from '../controllers/loginController.ts'

const  router = express.Router();

router.get('/login', login);

export default router;