import {CartServices} from "../services/cart.services.js"
import { IHash } from "../types/hash.type.js"


export class CartController{
    private static instance: CartController
    private readonly cartServices: CartServices

    private constructor(){
        this.cartServices = new CartServices()
    }

    static initController(){
        const instance = new CartController()
        CartController.instance = instance

        return instance
    }

    addToCart = async(args: IHash) =>{
        try{
            const product_id = args.cmd[2]
            const quantity = Number(args['quantity'])
            const userId = args.userId as string
            
            if(!userId){
                console.log("User Id is required.")
                return
            }
            const result = await this.cartServices.addToCart(product_id, quantity, userId)
            console.log(result)
        }catch(e:any){
            console.log(e.message)
        }
    }
    
    viewCart = async(args: IHash) =>{
        try{
            const userId = args.userId as string
            if(!userId){
                console.log("User Id is required.")
                return 
            }
            const carts = await this.cartServices.viewCart(userId)
            if(carts.length == 0){
                console.log("Cart is empty!!")
                return
            }
            console.log(carts)
        } catch(e:any){
            console.log(e.message)
        }
    }
    
    removeCartItem = async(args: IHash) =>{
        try{
            const product_id = args.cmd[2]
            const userId = args.userId as string
            if(!userId){
                console.log("User Id is required.")
                return
            }
            const result = await this.cartServices.removeCartItem(product_id, userId)
            console.log(result)
        } catch (e:any){
            console.log(e.message)
        }
    }
    
    cartTotal = async(args: IHash) =>{
        try{
            const userId = args.userId as string
            if(!userId){
                console.log("User Id is required.")
                return
            }
            const result = await this.cartServices.cartTotal(userId)
            console.log("Cart total:", result)
        } catch(e:any){
            console.log(e.message)
        }
    }
}
    