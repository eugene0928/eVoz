import { Request, Response, NextFunction } from "express";
import { Users } from "../../entity/user.js";
import bcrypt from "bcrypt";
import { InternalServerError, BadRequestError, ValidationError } from "../../utils/custom.errors.js";
import { reg_schema } from "../../utils/joi.js";
import { AppDataSource } from "../../utils/data-source.js";

export const Register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error, value } = reg_schema.validate(req.body)

        if(error) {
            next(new ValidationError(422, error.message))
            return
        }

        value.password = await bcrypt.hash(value.password, 5)
        // insert data db
        let data = undefined;
        try {
            data = await AppDataSource.createQueryBuilder()
                            .insert()
                            .into(Users)
                            .values([{ 
                                name: value.name,
                                email: value.email,
                                password: value.password,
                                is_admin: false
                             }])
                            .execute();
        } catch (error: any) {
            next(new ValidationError(422, error.message))
            return
        }
        
        res.status(200).json({ status: 200, message: "Successfully registered", data: data.identifiers[0].id })
    } catch (error: any) {
        next(new InternalServerError(500, error.message))
    }
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

export const Register_Admin = () => {
    // this route will be to add new admin
}