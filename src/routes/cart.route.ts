import CartController from "../controller/cart.controllers"
import { IHash } from "../types/hash.type.js"

const CartRoute = (cmd_args: IHash) =>{
    switch(cmd_args.cmd[1]){
        case "add":
            CartController.addToCart(cmd_args)
            break
        case "view":
            CartController.viewCart(cmd_args)
            break
        case "remove":
            CartController.removeCartItem(cmd_args)
            break
        case "total":
            CartController.cartTotal(cmd_args)
            break
        default:
            console.log(`Command doesn't exist for: ${cmd_args.cmd[0]} ${cmd_args.cmd[1]}`)
    }
}

export default CartRoute