import CartServices from "../services/cart.services.js"
import { IHash } from "../types/hash.type.js"

const addToCart = async(args: IHash) =>{
    try{
        const product_id = args.cmd[2]
        const quantity = Number(args['quantity'])
        const userId = args.userId as string

        if(!userId){
            console.log("User Id is required.")
            return
        }
        const result = await CartServices.addToCart(product_id, quantity, userId)
        console.log(result)
    }catch(e:any){
        console.log(e.message)
    }
}

const viewCart = async(args: IHash) =>{
    try{
        const userId = args.userId as string
        if(!userId){
            console.log("User Id is required.")
            return 
        }
        const carts = await CartServices.viewCart(userId)
        if(carts.length == 0){
            console.log("Cart is empty!!")
            return
        }
        console.log(carts)
    } catch(e:any){
        console.log(e.message)
    }
}

const removeCartItem = async(args: IHash) =>{
    try{
        const product_id = args.cmd[2]
        const userId = args.userId as string
        if(!userId){
            console.log("User Id is required.")
            return
        }
        const result = await CartServices.removeCartItem(product_id, userId)
        console.log(result)
    } catch (e:any){
        console.log(e.message)
    }
}

const cartTotal = async(args: IHash) =>{
    try{
        const userId = args.userId as string
        if(!userId){
            console.log("User Id is required.")
            return
        }
        const result = await CartServices.cartTotal(userId)
        console.log("Cart total:", result)
    } catch(e:any){
        console.log(e.message)
    }
}

const CartController = {
    addToCart,
    viewCart, 
    removeCartItem, 
    cartTotal
}

export default CartController