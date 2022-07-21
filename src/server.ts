import express, { Express } from "express";
import { AppDataSource } from './utils/data-source.js';
import loadData from "./data/podcast.js";
import Routers from "./modules/index.js";
import { handler } from "./utils/errorHandling.js"

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
      app.use(Routers.UserRouter)

      //error handler
      app.use(handler)
    } catch (error: any) {
       console.log(error.message) 
   }

   app.listen(PORT, () => console.log('=> ' + PORT))
})() 

