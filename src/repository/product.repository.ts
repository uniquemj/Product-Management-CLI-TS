import path from 'path'
import { readFileHelper, writeFileHelper } from '../helper/utils'
import { IProduct } from '../types/product.type'
import { IHash } from '../types/hash.type'
import { CategoryRepository } from './category.repository'

export const productStorage = path.join(process.cwd(), 'data', 'products.json')

export class ProductRepository{
    private readonly categoryRepository: CategoryRepository;

    constructor(){
        this.categoryRepository = new CategoryRepository()
    }

    findAll = async():Promise<IProduct[] | []> =>{
        try{
            return await readFileHelper(productStorage)
        }catch(e:any){
            await writeFileHelper(productStorage, [])
            return await readFileHelper(productStorage)
        }
    }
    
    findById = async(id:string): Promise<IProduct> =>{
        const products = await readFileHelper(productStorage)
        const product = products.find((product:IProduct) => product.p_id == id)
        return product
    }
    
    create = async(productDetail: IProduct): Promise<string> =>{
        try{
            const products = await readFileHelper(productStorage)
            products.push(productDetail)
            await writeFileHelper(productStorage, products)
            return "Product Added"
        }catch(e:any){
            await writeFileHelper(productStorage, [productDetail])
            return "Product Added"
        }
    }
    
    edit = async(id: string, args: IHash): Promise<IProduct> =>{
        try{
            
            const {name, price, description, category, inventory} = args
            const products = await readFileHelper(productStorage)
            const productIndex = products.findIndex((p:IProduct) => p.p_id == id)
            
            let category_list = []

            if(category){
                const categoryExist = await this.categoryRepository.getCategory(args.category as string)
                if(!categoryExist){
                    const newCategory = await this.categoryRepository.addCategory(args.category as string)
                    category_list.push(newCategory)
                }else{
                    category_list.push(categoryExist)
                }
            }

            const productDetail = {
                name: name || products[productIndex].name,
                price: Number(price) || products[productIndex].price, 
                description: description ||products[productIndex].description, 
                category: [...products[productIndex].category, ...category_list],
                inventory: Number(inventory)+products[productIndex].inventory || products[productIndex].inventory
            }
            
            products[productIndex] = {...products[productIndex], ...productDetail}
            await writeFileHelper(productStorage, products)
            return products[productIndex]
        } catch(e){
            throw new Error("Product Update Failed")
        }
    }
    
    remove = async(id: string): Promise<boolean> =>{
        try{
            const products = await readFileHelper(productStorage)
            const newProducts = products.filter((p:IProduct)=>p.p_id!==id)
            await writeFileHelper(productStorage, newProducts)
            return true
        }catch(e){
            throw new Error("product Delete Failed")
        }
    }

    removeProductCategory = async(productId: string, categoryId: string): Promise<IProduct> =>{
        try{
            const products = await readFileHelper(productStorage) as IProduct[]
            const productIndex =  products.findIndex((product) => product.p_id == productId)
            const product = products[productIndex]
            const productCategory = product.category?.filter((c)=>c.category_id !== categoryId)
            product.category = productCategory
            await writeFileHelper(productStorage, products)
            return product
        }catch(e){
            throw new Error("Something went wrong.")
        }
    }
    
}
