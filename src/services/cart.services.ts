import {ProductRepository} from "../repository/product.repository.js"
import {CartRepository} from "../repository/cart.repository.js"
import { ICartItem, ICart } from "../types/cart.type.js"
import { IHash } from "../types/hash.type.js"


export class CartServices{
    private readonly productRepository: ProductRepository
    private readonly cartRepository: CartRepository

    constructor(){
        this.productRepository = new ProductRepository()
        this.cartRepository = new CartRepository()
    }

    addToCart = async (product_id: string, quantity: number, userId: string): Promise<string> =>{
        
        if(!quantity){
            return "Quantity is required"
        }
        const product = await this.productRepository.findById(product_id)
        if(!product){
            return "Product with Id doesn't exist."
        }
        
        const result = await this.cartRepository.add(product, quantity, userId)
        return result
    }
    
    viewCart = async(userId: string): Promise<string | [] | ICart[]> =>{
        return await this.cartRepository.getAllCart(userId)
    }
    
    removeCartItem = async(product_id: string, userId:string): Promise<string> =>{
        const cart_Items = await this.cartRepository.getAllCart(userId) as unknown as ICart[] 
        const cart_Item = cart_Items[0].items.find((t:ICartItem)=>t.product.p_id === product_id) as ICartItem

        if(!cart_Item){
            return 'Product with Id not found.'
        }
        
        const cartItem = await this.cartRepository.remove(cart_Item, userId)
        return cartItem
    }
    
    cartTotal = async(userId:string): Promise<number> =>{
        return await this.cartRepository.total(userId)
    }
}