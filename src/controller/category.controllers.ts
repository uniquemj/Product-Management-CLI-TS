import { CategoryServices } from "../services/category.services"
import { IHash } from "../types/hash.type"


export class CategoryController{
    private static instance: CategoryController
    private readonly categoryServices: CategoryServices

    private constructor(){
        this.categoryServices = new CategoryServices()
    }

    static initController(){
        const instance = new CategoryController()
        CategoryController.instance = instance

        return instance
    }

    addCategory = async (args: IHash) =>{
        try{
            const category = args['category'] as string
            const result = await this.categoryServices.addCategory(category)
            console.log(result)
        }catch(e:any){
            console.log(e.message)
        }
    }

    getCategoryList = async() =>{
        try{
            const result = await this.categoryServices.getCategoryList()
            console.log(result)
        }catch(e:any){
            console.log(e.message)
        }
    }

    removeCategory = async(args: IHash)=>{
        try{
            const categoryId = args.cmd[2] as string
            const result = await this.categoryServices.removeCategory(categoryId)
            console.log(result)
        }catch(e:any){
            console.log(e.message)
        }
    }
}