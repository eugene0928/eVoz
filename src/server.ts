import express, { Express } from "express";
import "./conf.js";  
import "./bot/bot.js";
import { AppDataSource } from './utils/data-source.js';
import loadData from "./data/podcast.js";
import Routers from "./modules/index.js";
import { handler } from "./utils/errorHandling.js";
import fileUpload from "express-fileupload";
import { join } from "path";
 
const app: Express = express();
const PORT:number = 4000;

(async function() {
   try {
      const db = await AppDataSource.initialize()
      console.log("Db is initialized!")

      await loadData(AppDataSource)

      // static folders
      app.use(express.static(join(process.cwd(), "src", "images")))
      app.use(express.static(join(process.cwd(), "src", "podcasts")))

      // middlewares
      app.use(express.json())
      app.use(fileUpload()) 
      
      // routes
      app.use(Routers.UserRouter)
      app.use(Routers.CategoryRouter)
      app.use(Routers.PodcastRouter)
      app.use(Routers.AdminRouter)

      //error handler
      app.use(handler)
    } catch (error: any) {
       console.log(error.message) 
   }

   app.listen(PORT, () => console.log('=> ' + PORT))
})() 

