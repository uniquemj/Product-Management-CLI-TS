import {ProductRepository} from "../repository/product.repository";
import { getRandomId } from "../helper/utils";
import { IHash } from "../types/hash.type";
import { IProduct } from "../types/product.type";
import { CategoryRepository } from "../repository/category.repository";
import { ICategory } from "../types/category.type";

export class ProductServices{
    private readonly productRepository: ProductRepository
    private readonly categoryRepository: CategoryRepository
    
    constructor(){
        this.productRepository = new ProductRepository()
        this.categoryRepository = new CategoryRepository()
    }
    
    getAllProduct = async(): Promise<IProduct[] | []> =>{
        return await this.productRepository.findAll()
    }
    
    createProduct = async(args:IHash):Promise<string> =>{
        
        if(!args.name || !args.price){
            return "Name and Price are required."
        }
        let category_list = []
        if(args.category){
            const categoryExist = await this.categoryRepository.getCategory(args.category as string)
            if(!categoryExist){
                const newCategory = await this.categoryRepository.addCategory(args.category as string)
                category_list.push(newCategory)
            }else{
                category_list.push(categoryExist)
            }
        }
        return await this.productRepository.create({
            p_id: getRandomId(),
            name: args.name as string,
            price: Number(args.price),
            description: args.description as string??"",
            category: category_list as ICategory[],
            inventory: Number(args.inventory) || 0
        })
    }
    
    updateProduct = async(id: string, args: IHash):Promise<IProduct|string> =>{
        
        const product = await this.productRepository.findById(id)
        if(!product){
            return "Product with Id not found"
        }
        
        const result = await this.productRepository.edit(id, args)
        return result
    }
    
    removeProduct = async(id:string):Promise<boolean> =>{
        const product = await this.productRepository.findById(id)
        
        if(!product){
            return false
        }
        
        return await this.productRepository.remove(id)
    }

    removeProductCategory = async(productId: string, categoryId: string)=>{
        const product = await this.productRepository.findById(productId)
        if(!product){
            return 'Product with Id not found.'
        }
        return await this.productRepository.removeProductCategory(productId, categoryId)
    }
}
