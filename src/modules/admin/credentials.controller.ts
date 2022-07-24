import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { InternalServerError, NotFoundError, BadRequestError, ValidationError } from "../../utils/custom.errors.js";
import { Users } from "../../entity/user.js";
import { sendEmail } from "./email/send.email.js";
import { pass_generator } from "./passw.generator.js";

export const Change_Passw = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admin = await Users.findOne({ 
            select: {
                id: true,
                name: true,
                email: true,
                is_admin: true
            },
            where: { id: req.params.admin_id } 
        })

        if(!admin) {
            next(new NotFoundError(404, "Such admin is not fount"))
            return
        }

        if(!(admin?.is_admin)) {
            next(new BadRequestError(400, "You do not have permission to change credentials"))
            return
        }

        const new_passw = pass_generator()

        await sendEmail(admin?.email, new_passw)

        res.status(200).json({ status: 200, message: "Please, check your email", data: new_passw })
    } catch (error: any) {
        next(new InternalServerError(500, error.message))
    }
}

export const Change_Email = () => {

}

export const Update_Passw = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // check if admin get generated password
        if(!process.env.GEN_PASS) {
            next(new BadRequestError(400, "You should get password first"))
            return
        }
        // validate generated password
        if(process.env.GEN_PASS != req.body.passw) {
            next(new ValidationError(422, "Password does not match. Please use password which is sent to your email"))
            return
        }
        // validate admin passwords
        if(!(req.body.new_passw.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/))) {
            next(new BadRequestError(400, "Invalid password. Password should have at least one uppercase, one digit and length should be at least 8"));
            return
        }
        if(req.body.new_passw != req.body.confirm_passw) {
            next(new ValidationError(422, "Passwords do not match"))
            return
        }
        // get admin from db
        const admin = await Users.findOne({ 
            select: {
                id: true,
                name: true,
                email: true,
                is_admin: true
            },
            where: { id: req.params.admin_id } 
        })
        // validation
        if(!admin) {
            next(new NotFoundError(404, "Such admin is not fount"))
            return
        }

        if(!(admin?.is_admin)) {
            next(new BadRequestError(400, "You do not have permission to change credentials"))
            return
        }
        // hash the password
        req.body.new_passw = await bcrypt.hash(req.body.new_passw, 5)
        // update admin password
        admin.password = req.body.new_passw
        await admin.save()
        // clean the environment password
        process.env.GEN_PASS = ""

        res.status(200).json({ status: 200, message: "Your password is updated!", data: admin })
    } catch (error: any) {
        next(new InternalServerError(500, error.message))
    }
}