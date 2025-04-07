import OrderServices from "../services/order.services.js";
import { IHash } from "../types/hash.type.js";

const createOrder = async (args: IHash) =>{
    try{
        const userId = args.userId as string
        const result = await OrderServices.createOrder(userId)
        console.log(result)
    } catch(e:any){
        console.log(e.message)
    }
}

const getOrderList = async (args: IHash) =>{
    try{
        const userId = args.userId as string
        if(!userId){
            console.log("User Id is required.")
            return
        }
        const result = await OrderServices.getOrderList(userId)
        console.log(result)
    }catch(e:any){
        console.log(e.message)
    }
}

const updateStatus = async (args: IHash) =>{
    try{
        const orderId = args.cmd[2]
        
        if(!args.userId || !args.status){
            console.log("User Id and status required")
            return
        }
        const userId = args.userId as string
        const status = args.status as string
        const availableStatus = ["Pending", "Processing", "Delivered"]
        if(!availableStatus.includes(status)){
            console.log(`Status should be followings: ${availableStatus}`)
            return
        }
        const result = await OrderServices.updateStatus(orderId, userId, status)
        console.log(result)
    } catch (e:any) {
        console.log(e.message)
    }
}

const OrderController = {
    createOrder,
    getOrderList,
    updateStatus
}

export default OrderController