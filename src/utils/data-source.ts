import "reflect-metadata"
import { DataSource } from 'typeorm'
import { Admins } from "../entity/admin.js"
import { Category } from "../entity/category.js"
import { Podcast } from "../entity/podcast.js"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [ Admins,Category, Podcast ],
    subscribers: [],
    migrations: [],
})