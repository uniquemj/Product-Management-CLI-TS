import ProductRepository from "../repository/product.repository.js"
import CartRepository from "../repository/cart.repository.js"
import { ICartItem } from "../types/cart.type.js"
import { IHash } from "../types/hash.type.js"

const addToCart = async (product_id: string, quantity: number, userId: string) =>{
    
    if(!quantity){
        return "Quantity is required"
    }
    const product = await ProductRepository.findById(product_id)
    if(!product){
        return "Product with Id doesn't exist."
    }

    const result = await CartRepository.add(product, quantity, userId)
    return result
}

const viewCart = async(userId: string) =>{
    return await CartRepository.getAllCart(userId)
}

const removeCartItem = async(product_id: string, userId:string) =>{
    const cart_Items = await CartRepository.getAllCart(userId)
    const cart_Item = cart_Items[0].items.find((t:ICartItem)=>t.product.p_id === product_id)
    if(cart_Item.length == 0){
        return 'Product with Id not found.'
    }

    const cartItem = await CartRepository.remove(cart_Item, userId)
    return cartItem
}

const cartTotal = async(userId:string) =>{
    return await CartRepository.total(userId)
}

const CartServices = {
    addToCart,
    viewCart,
    removeCartItem,
    cartTotal
}

export default CartServices