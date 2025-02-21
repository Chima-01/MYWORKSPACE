import { Request, Response } from "express";

export const getAllBooks = async (req: Request, res: Response): Promise<any> => {
  return res.json('All Books');  
}