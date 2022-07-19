import { Category } from "../entity/category.js";

const categories: string[] = ["Stories", "Educational", "Music", "lifestyle & health",
"Business & Technology", "Arts & Entertainment", "Sports & Reacreation", "Comedy", "News & Politics", "Video games"];

export default async function loadData(AppDataSource:any) {
    const data = await Category.find({  })
    if(!data.length) {
        try {
            for(let category of categories) {
                const entity = new Category();
                entity.name = category;
        
                const getRepository = AppDataSource.getRepository(Category);
                await getRepository.save(entity);
            }
            console.log("Category is loaded successfully");
        } catch (error: any) {
            console.log("Category loading failed...");
            console.log(error.message); 
        }
    } 
}
  