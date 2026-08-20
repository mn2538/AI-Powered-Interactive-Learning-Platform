import dotenv from 'dotenv';
import * as authServices from '../services/authService.ts';
import { Request, Response } from "express";

dotenv.config();

interface login {
    email: string;
    password: string;
}

interface register {
    username: string;
    loginDetails: login;
}

export const login = async(req: Request, res: Response) => {
    try{
        const {email, password} = req.body;
        const response = await authServices.login(email, password);
        res.status(200).json(response);
    }
    catch(err) {
        res.status(400).json({
            success: false,
            message: err,
        })
    }
} 

export const register = async(req: Request, res: Response) => {
    try{
        const {name, email, password} = req.body;
        const result = await authServices.register(name, email, password);
        res.status(200).json(result);
    }
    catch(err) {
        res.status(400).json({
            success: false,
            message: err,
        })
    }
}