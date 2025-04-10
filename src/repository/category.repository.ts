import path from 'path'
import { ICategory } from '../types/category.type'
import { readFileHelper, writeFileHelper } from '../helper/utils'
import { getRandomId } from "../helper/utils";

const categoryStorage = path.join(process.cwd(), 'data', 'category.json')


export class CategoryRepository{
    async addCategory(category: string):Promise<ICategory>{
        const categoryInfo = {
            category_id: getRandomId(),
            title: category
        }
        try{
            const categories = await readFileHelper(categoryStorage)
            categories.push(categoryInfo)
            await writeFileHelper(categoryStorage, categories)
            return categoryInfo
        }catch(e){
            await writeFileHelper(categoryStorage, [categoryInfo])
            return categoryInfo
        }
    }

    async getCategory(categorytitle: string):Promise<ICategory | boolean>{
        try{
            const categories = await readFileHelper(categoryStorage)
            const category = categories.find((category: ICategory)=>category.title == categorytitle)
            if(!category){
                return false
            }
            return category
        }catch(e){
            await writeFileHelper(categoryStorage, [])
            throw new Error("Something went wrong.")
        }
    }
    async getCategoryById(categoryId: string):Promise<ICategory>{
        try{
            const categories = await readFileHelper(categoryStorage)
            const category = categories.find((category: ICategory)=>category.category_id == categoryId)
            return category
        }catch(e){
            throw new Error("Something went wrong.")
        }
    }

    async getCategoryList():Promise<ICategory[]>{
        try{
            const categories = await readFileHelper(categoryStorage)
            return categories
        }catch(e){
            await writeFileHelper(categoryStorage, [])
            throw new Error("Category Empty.")
        }
    }

    async removeCategory(categoryId: string): Promise<string>{
        try{
            const categories = await readFileHelper(categoryStorage)
            const newCategories = categories.filter((category: ICategory)=> category.category_id != categoryId)
            await writeFileHelper(categoryStorage, newCategories)
            return "Category removed"
        }catch(e){
            throw new Error("Something went wrong while removing.")
        }
    }
}