import {OrderRepository} from "../repository/order.repository.js";
import { IOrder } from "../types/order.type.js";

export class OrderServices{
    private readonly orderRepository: OrderRepository

    constructor(){
        this.orderRepository = new OrderRepository()
    }

    createOrder = async(user_id: string) =>{
        const user_order = await this.orderRepository.getOrderList(user_id)
        if(!user_order){
            return "Order with user exist."
        }
        return await this.orderRepository.createOrder(user_id)
    }
    
    getOrderList = async(user_id:string) =>{
        return await this.orderRepository.getOrderList(user_id)
    }
    
    updateStatus = async(orderId:string, userId:string, status:string) =>{
        const user_order = await this.orderRepository.getOrderList(userId) as IOrder
        
        if(user_order.o_id !== orderId){
            return "Order with Order Id not found."
        }
        
        return await this.orderRepository.updateStatus(orderId, userId, status)
    }
    
}
