import {OrderController} from "../controller/order.controllers"
import { IHash } from "../types/hash.type.js"


const orderController = OrderController.initController()

const OrderRoute = (cmd_args: IHash) =>{
    switch(cmd_args.cmd[1]){
        case "create":
            orderController.createOrder(cmd_args)
            break
        case "list":
            orderController.getOrderList(cmd_args)
            break
        case "status":
            orderController.updateStatus(cmd_args)
            break
        default:
            console.log(`Command doesn't exist for: ${cmd_args.cmd[0]} ${cmd_args.cmd[1]}`)
    }
}

export default OrderRoute