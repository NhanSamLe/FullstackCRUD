import type { Request, Response, NextFunction } from 'express';

export const delay = (req: Request, res: Response, next: NextFunction) => {
    setTimeout(() => {
        next();
    }, 1000);
}
