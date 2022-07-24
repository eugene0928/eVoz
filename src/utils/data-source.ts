import "reflect-metadata"
import { DataSource } from 'typeorm'
import { Users } from "../entity/user.js"
import { Category } from "../entity/category.js"
import { Podcast } from "../entity/podcast.js"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.HOST,
    port: 5432,
    username: "postgres",
    password: process.env.PASSWORD,
    database: process.env.DB,
    synchronize: true,
    logging: false,
    entities: [ Users,Category, Podcast ],
    subscribers: [],
    migrations: [],
})