import ProductRepository from "../repository/product.repository";
import { getRandomId } from "../helper/utils";
import { IHash } from "../types/hash.type";

const getAllProduct = async() =>{
    return await ProductRepository.findAll()
}

const createProduct = async(args:IHash) =>{

    if(!args.name || !args.price){
        return "Name and Price are required."
    }

    return await ProductRepository.create({
        p_id: getRandomId(),
        name: args.name as string,
        price: Number(args.price),
        description: args.description as string??"",
        category: args.category as string??"",
        inventory: Number(args.inventory) || 0
    })
}

const updateProduct = async(id: string, args: IHash) =>{

    const product = await ProductRepository.findById(id)
    if(!product){
        return "Product with Id not found"
    }

    const result = await ProductRepository.edit(id, args)
    return result
}

const removeProduct = async(id:string) =>{
    const product = await ProductRepository.findById(id)

    if(!product){
        return false
    }

    return await ProductRepository.remove(id)
}

const ProductServices = {
    getAllProduct,
    createProduct,
    updateProduct, 
    removeProduct
}

export default ProductServices
