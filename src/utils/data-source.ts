import "reflect-metadata"
import { DataSource } from 'typeorm'
import { Users } from "../entity/user.js"
import { Category } from "../entity/category.js"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [ Users,Category ],
    subscribers: [],
    migrations: [],
})