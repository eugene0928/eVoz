import { Request, Response, NextFunction } from "express";
import { InternalServerError } from "../../utils/custom.errors.js";
import { Category } from "../../entity/category.js"

export const Get_Categories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allCategories = await Category.find()
        
        res.status(200).json({ status: 200, message: "All categories", data: allCategories })
    } catch (error: any) {
        next(new InternalServerError(500, error.message))
    }
}