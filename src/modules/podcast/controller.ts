import { join } from "path";
import { Request, Response, NextFunction } from "express";
import { Users } from "../../entity/user.js";
import { InternalServerError, BadRequestError, ValidationError, NotFoundError } from "../../utils/custom.errors.js";
import { add_podcast_schema } from "../../utils/joi.js";
import { Podcast } from "../../entity/podcast.js";
import { UploadedFile } from "express-fileupload";
import { AppDataSource } from "../../utils/data-source.js";

export const Add_Podcast = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //check req is sent by admin or not
        let admin = null
        try {
            admin = await Users.findOneBy({ id: req.params.admin_id })
        } catch (error: any) {
            next(new BadRequestError(400, error.message))
            return
        }
        
        if(!admin) {
            next(new NotFoundError(404, "Such admin is not fount"))
            return
        }
        // admin status
        if(!(admin?.is_admin)) {
            next(new ValidationError(422, "You don't have permission to add podcast"))
            return
        }
        // validate body
        const { error, value } = add_podcast_schema.validate(req.body)
        if(error) {
            next(new ValidationError(422, error.message))
            return
        }

        // get data from form-data
        const file = req.files?.file as UploadedFile
        const image = req.files?.image as UploadedFile

        // check if it is audio file
        if(!(file.mimetype.includes('audio/'))) {
            next(new ValidationError(422, "Only audio files will be accepted"))
            return
        }

        const time = Date.now()
        //rename file name
        file.name = `${time}${file.name}`

        //check if it is image file
        if(!(image.mimetype.includes('image/'))) {
            next(new ValidationError(422, "Only image files will be accepted"))
            return
        }
        // rename image name
        image.name = `${time}${image.name}`

        // insert data to db
        let podcast = null
        try {
            podcast = await AppDataSource.createQueryBuilder()
                                        .insert()
                                        .into(Podcast)
                                        .values([{
                                            admin: admin,
                                            category: value.category_id,
                                            name: value.name,
                                            speaker: value.speaker,
                                            file: file.name,
                                            picture: image.name
                                        }])
                                        .execute();
        } catch (error: any) {
            next(new ValidationError(422, error.message))
            return
        }

        // write file to spec folders
        file.mv(join(process.cwd(), "src", "podcasts", file.name))
        image.mv(join(process.cwd(), "src", "images", image.name))

        res.status(200).json({ status: 200, message: "Successfully uploaded", data: podcast.identifiers[0].id })

    } catch (error: any) {
        next(new InternalServerError(500, error.message))
    }
}