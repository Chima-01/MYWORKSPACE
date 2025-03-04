import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


 const secret_key = process.env.SECRET_KEY;

export const verifyUser = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ success: false, error: 'No Authentication found' });
    return;
  }

  jwt.verify(token, secret_key as string, (err, decoded: any) => {

  if (err || !(decoded.id && decoded.role)) {
    return res.status(401).json({ success: false, error: 'Unauthorized Access!' });
  }

  next();
  });
}

export const verifyAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ success: false, error: 'No Authentication found' });
    return;
  }

  jwt.verify(token, secret_key as string, (err, decoded: any) => {

  if (err || !(decoded.id && decoded.role)) {
    return res.status(401).json({ success: false, error: 'Unauthorized Access!' });
  }

  if (decoded.role !== "admin") {
    return res.status(403).json({ success: false, error: `Unauthorized access!`});
  }
  next();
  });
}