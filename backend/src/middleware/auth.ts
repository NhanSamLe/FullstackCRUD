import jwt from 'jsonwebtoken';
import type { Request ,Response,NextFunction } from 'express';

export interface AuthRequest extends Request {
  user?: any;
}
const white_list =["/", "/register", "/login"]; 

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const path =  '/v1/api' + req.path;
    if(white_list.includes(req.path))
    {
        return next()
    }
    const authHeader =req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const token =authHeader.split(' ')?.[1];

    if(!token){
        return res.status(401).json({ message: "Unauthorized: Malformed token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token has expired or is invalid" });
    }
}
