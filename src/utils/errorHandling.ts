import { Request, Response, NextFunction } from "express";
import { error } from "../types/error.js";
import { appendFile } from "fs/promises";
import { join } from "path";

export const handler = async (error: error, req: Request, res: Response, next: NextFunction) => {
    if(error.status == 500) {
        const data = `${new Date().toISOString()}___${req.url}___${req.method}___${error.message}\n`;
        appendFile(join(process.cwd(), "logger.txt"), data)

        res.status(500).json({ status: 500, name: "InternalServerError", message: "Internal Server Error" })
        return
    }

    res.status(error.status).json({ status: error.status, name: error.name, message: error.message })
}