import {OrderServices} from "../services/order.services.js";
import { IHash } from "../types/hash.type.js";

export class OrderController{
    private static instance: OrderController;
    private readonly orderServices: OrderServices;

    private constructor(){
        this.orderServices = new OrderServices()
    }

    static initController(){
        const instance = new OrderController()
        OrderController.instance = instance

        return instance
    }

    createOrder = async (args: IHash) =>{
        try{
            const userId = args.userId as string
            const result = await this.orderServices.createOrder(userId)
            console.log(result)
        } catch(e:any){
            console.log(e.message)
        }
    }
    
    getOrderList = async (args: IHash) =>{
        try{
            const userId = args.userId as string
            if(!userId){
                console.log("User Id is required.")
                return
            }
            const result = await this.orderServices.getOrderList(userId)
            console.log(result)
        }catch(e:any){
            console.log(e.message)
        }
    }
    
    updateStatus = async (args: IHash) =>{
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
            const result = await this.orderServices.updateStatus(orderId, userId, status)
            console.log(result)
        } catch (e:any) {
            console.log(e.message)
        }
    }
}
    