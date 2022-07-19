import express, { Express, Router } from "express";
import { AppDataSource } from './utils/data-source.js'
import routes from "./modules/index.js"

const app: Express = express();
const PORT:number = 4000;

(async function() {
   try {
        const db = await AppDataSource.initialize()
        console.log("Db is initialized!")

        // middlewares
        app.use(express.json())
        
        // routes
        app.use(routes.Reg_Router)
   } catch (error: any) {
       console.log(error.message) 
   }

   app.listen(PORT, () => console.log('=> ' + PORT))
})() 

