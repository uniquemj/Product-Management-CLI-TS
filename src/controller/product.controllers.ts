import {ProductServices} from "../services/product.services.js"
import { IHash } from "../types/hash.type.js"



export class ProductController{
    private static instance: ProductController;
    private readonly productServices: ProductServices;

    constructor(){
        this.productServices = new ProductServices()
    }

    static initController(){
        const instance = new ProductController()
        ProductController.instance = instance
        return instance
    }

    getAllProducts = async () =>{
        try{
            const result = await this.productServices.getAllProduct()
            if(result.length == 0){
                process.stderr.write("Error: Product List is Empty!")
            } else{
                console.log(result)
            }
        }catch(e:any){
            console.log(e.message)
        }
    }
    
    createProduct = async(args:IHash) =>{
        try{
            const result = await this.productServices.createProduct(args)
            console.log(result)
        } catch (e:any){
            console.log(e.message)
        }
    }
    
    updateProduct = async(args:IHash) =>{
        try{
            const id = args.cmd[2]
            const result = await this.productServices.updateProduct(id, args)
            console.log(result)
        } catch(e:any){
            console.log(e.message)
        }
    }
    
    removeProduct = async(id: string) =>{
        try{
            const result = await this.productServices.removeProduct(id)
            if(!result){
                console.log("Product with Id doesn't exist.")
            } else {
                console.log("Product removed.")
            }
            
        } catch (e:any) {
            console.log(e.message)
        }
    }

    removeProductCategory = async(args: IHash) =>{
        try{
           const productId = args.cmd[2] as string
           const {categoryId} = args
           const result = await this.productServices.removeProductCategory(productId, categoryId as string) 
           console.log(result)
        }catch(e:any){  
            console.log(e.message)
        }
    }
}