import {CartController }from "../controller/cart.controllers"
import { IHash } from "../types/hash.type.js"


const cartController = CartController.initController()

const CartRoute = (cmd_args: IHash) =>{
    switch(cmd_args.cmd[1]){
        case "add":
            cartController.addToCart(cmd_args)
            break
        case "view":
            cartController.viewCart(cmd_args)
            break
        case "remove":
            cartController.removeCartItem(cmd_args)
            break
        case "total":
            cartController.cartTotal(cmd_args)
            break
        default:
            console.log(`Command doesn't exist for: ${cmd_args.cmd[0]} ${cmd_args.cmd[1]}`)
    }
}

export default CartRoute