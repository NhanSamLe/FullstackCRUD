import userService from '../services/userService.js';
import type { Request, Response } from 'express';
const createUser = async (req: Request, res: Response) => {
    const data = req.body;
    const result = await userService.create(data);
    if (result) {
        res.status(201).json({ message: "User created successfully" });
    } else {
        res.status(400).json({ message: "Error creating user" });
    }
}
const loginUser = async (req: Request , res : Response) => {
    const data =req.body;
    const result = await userService.login(data.email, data.password);
    if(result){
        res.status(200).json({ message: "Login successful", token: result.token });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
}
const getUsers = async (req: Request, res: Response) => {
    const result = await userService.getUser();
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(400).json({ message: "Error fetching users" });
    }
}

export default {
    createUser,
    loginUser,
    getUsers,
}