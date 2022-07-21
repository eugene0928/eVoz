import { Request, Response, NextFunction } from "express";
import { Users } from "../../entity/user.js";
import bcrypt from "bcrypt";
import { InternalServerError, BadRequestError } from "../../utils/custom.errors.js"

export const Register = (req: Request, res: Response, next: NextFunction) => {

}

export const Login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get user data by email and check passw with hashed passw
        const user = await Users.findOne({ where: { email: req.body.email } })
        const is_true_hashedPassw = bcrypt.compareSync(req.body.password, `${user?.password}`)

        // throw error if user can not login properly
        if(!user || !is_true_hashedPassw) {
            next(new BadRequestError(400, "Invalid email or password"))
            return
        }

        res.status(200).json({ status: 200, message: "Successfully logged in", data: user?.id })
    } catch (error: any) {
        next(new InternalServerError(500, error.message))
    }
    
}