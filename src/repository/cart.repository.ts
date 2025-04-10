import path from 'path'
import { getRandomId, readFileHelper, writeFileHelper } from '../helper/utils.js'
import { productStorage }from './product.repository.js'
import {ProductRepository} from './product.repository.js'
import { ICart, ICartItem } from '../types/cart.type.js'
import { IProduct } from '../types/product.type.js'

export const cartStorage = path.join(process.cwd(), 'data', 'carts.json')

export class CartRepository{
    private readonly productRepository: ProductRepository

    constructor(){
        this.productRepository = new ProductRepository()
    }

    getAllCart = async(userId:string): Promise<[]|ICart[]|string> =>{
        try{
            const carts = await readFileHelper(cartStorage)
            const cartItems = carts.filter((cart_item:ICart)=>cart_item.userId == userId)
            
            if(cartItems.length == 0){
                return `Cart for userId: ${userId} doesn't exist`
            }
            
            return cartItems
        }catch(e){
            await writeFileHelper(cartStorage, [])
            throw new Error("Error: Cart is Empty")
        }
    }
    
    add = async(item: IProduct, quantity:number, userId:string) =>{
        // fetching the product value from Product storage
        const products = await this.productRepository.findAll()
        const productIndex = products.findIndex((p: IProduct)=>p.p_id == item.p_id)
        
        const productInfo = {
            p_id: products[productIndex].p_id,
            name: products[productIndex].name,
            price: products[productIndex].price
        }
        // Defining Cart Item
        const cartItemInfo = {
            c_id: getRandomId(),
            userId: userId,
            items: [
                {product:productInfo, quantity: Number(quantity)}
            ]
        }
        
        try{
            const carts = await readFileHelper(cartStorage)
            
            // get cart Items for userId
            // this will return cart with userId
            const cartItems = carts.find((c_item:ICart)=>c_item.userId == userId)
            
            // search for item if present or not?
            const user_cart_items = cartItems.items.filter((c_item:ICartItem)=>c_item.product.p_id == item.p_id)
            
            // checks if user contain same product or not.
            if(user_cart_items.length == 0){  
                // when cart with userId doesn't contain same product
                cartItems.items.push({product:productInfo, quantity: Number(quantity)})
            } else {
                // when cart with userId contain same product
                const cartItemIndex = cartItems.items.findIndex((t: ICartItem) => t.product.p_id == item.p_id)
                
                if(item.inventory! <= cartItems.items[cartItemIndex].quantity){
                    return 'Product quantity limit.'
                }
                
                cartItems.items[cartItemIndex].product = products[productIndex]
                cartItems.items[cartItemIndex].quantity += quantity
            }
            
            await writeFileHelper(cartStorage, carts)
            return 'Product Added to Cart'
            
        } catch(e){
            await writeFileHelper(cartStorage, [cartItemInfo])
            return 'Product Added to Cart'
        }
    }
    
    remove = async(item: ICartItem, userId:string) =>{
        try{
            const carts = await readFileHelper(cartStorage)
            // get cart Items for userId
            // this will return cart with userId
            const cartItems = carts.find((c_item: ICart)=>c_item.userId == userId)
            
            const cartItemsIndex = carts.findIndex((c_item:ICart)=>c_item.userId == userId)
            
            
            // search for item if present or not?
            const user_cart_items = cartItems.items.filter((c_item: ICartItem)=>c_item.product.p_id !== item.product.p_id)
            
            const newCartItems = user_cart_items
            cartItems['items'] = newCartItems
            carts[cartItemsIndex] = cartItems
            await writeFileHelper(cartStorage, carts)
            return 'Cart Item Removed.'
        }catch(e){
            throw new Error("Error: Cart Item Delete Fail.")
        }
    }
    
    total = async(userId:string): Promise<number> =>{
        try{
            const carts = await readFileHelper(cartStorage)
            const user_cart_items = carts.filter((c_item: ICart)=> c_item.userId == userId)
            
            const total = user_cart_items[0].items.reduce((acc:number, current:ICartItem)=>{
                acc+= (Number(current.product.price) * Number(current.quantity))
                return acc
            }, 0)
            return total
        } catch (e){
            throw new Error("Error: Cart total Failed.")
        }
    }
}
