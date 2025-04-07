import path from 'path'
import { readFileHelper, writeFileHelper } from '../helper/utils'
import { IProduct } from '../types/product.type'
import { IHash } from '../types/hash.type'

export const productStorage = path.join(process.cwd(), 'data', 'products.json')


const findAll = async() =>{
    try{
        return await readFileHelper(productStorage)
    }catch(e:any){
        await writeFileHelper(productStorage, [])
        return await readFileHelper(productStorage)
    }
}

const findById = async(id:string) =>{
    const products = await readFileHelper(productStorage)
    const product = products.find((product:IProduct) => product.p_id == id)
    return product
}

const create = async(productDetail: IProduct) =>{
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

const edit = async(id: string, args: IHash) =>{
    try{

        const {name, price, description, category, inventory} = args
        const products = await readFileHelper(productStorage)
        const productIndex = products.findIndex((p:IProduct) => p.p_id == id)
        
        const productDetail = {
            name: name || products[productIndex].name,
            price: price || products[productIndex].price, 
            description: description ||products[productIndex].description, 
            category: category || products[productIndex].category,
            inventory: Number(inventory)+products[productIndex].inventory || products[productIndex].inventory
        }
        
        products[productIndex] = {...products[productIndex], ...productDetail}
        await writeFileHelper(productStorage, products)
        return products[productIndex]
    } catch(e){
        throw new Error("Product Update Failed")
    }
}

const remove = async(id: string) =>{
    try{
        const products = await readFileHelper(productStorage)
        const newProducts = products.filter((p:IProduct)=>p.p_id!==id)
        await writeFileHelper(productStorage, newProducts)
        return true
    }catch(e){
        throw new Error("product Delete Failed")
    }
}

const ProductRepository = {
    findAll,
    findById,
    create, 
    edit,
    remove
}

export default ProductRepository