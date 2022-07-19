import express, { Express, Router } from "express";
import { AppDataSource } from './utils/data-source.js';
import loadData from "./data/podcast.js";

const app: Express = express();
const PORT:number = 4000;

(async function() {
   try {
        const db = await AppDataSource.initialize()
        console.log("Db is initialized!")

        await loadData(AppDataSource)
        // middlewares
        app.use(express.json())
        
        // routes

    } catch (error: any) {
       console.log(error.message) 
   }

   app.listen(PORT, () => console.log('=> ' + PORT))
})() 

