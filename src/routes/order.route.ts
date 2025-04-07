import OrderController from "../controller/order.controllers"
import { IHash } from "../types/hash.type.js"

const OrderRoute = (cmd_args: IHash) =>{
    switch(cmd_args.cmd[1]){
        case "create":
            OrderController.createOrder(cmd_args)
            break
        case "list":
            OrderController.getOrderList(cmd_args)
            break
        case "status":
            OrderController.updateStatus(cmd_args)
            break
        default:
            console.log(`Command doesn't exist for: ${cmd_args.cmd[0]} ${cmd_args.cmd[1]}`)
    }
}

export default OrderRoute