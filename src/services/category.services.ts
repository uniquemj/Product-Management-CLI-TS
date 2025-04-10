import { CategoryRepository } from "../repository/category.repository";

import { ICategory } from "../types/category.type";

export class CategoryServices{
    private readonly categoryRepository: CategoryRepository
    constructor(){
        this.categoryRepository = new CategoryRepository()
    }

    async addCategory(category: string){
        const categoryExist = await  this.categoryRepository.getCategory(category) as ICategory
        if(categoryExist){
            return 'Category Added.'
        }
        
        const result = await this.categoryRepository.addCategory(category)
        if(result){
            return 'Category Added'
        }
    }

    async getCategoryList(){
        const categories = await this.categoryRepository.getCategoryList()
        if(categories.length == 0){
            return "Category is Empty"
        }
        return categories
    }

    async removeCategory(categoryId: string){
        const category = await this.categoryRepository.getCategoryById(categoryId)
        if(!category){
            return "Category with Id doesn't exist."
        }
        const result = await this.categoryRepository.removeCategory(categoryId)
        return result
    }
}