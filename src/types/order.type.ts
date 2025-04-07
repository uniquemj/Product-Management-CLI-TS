import { ICartItem} from "./cart.type";

export enum OrderStatus{
    PENDING = "Pending",
    PROCESSING = "Processing",
    DELIVERED = "Delivered"
}

export interface IOrder{
    o_id: string,
    userId: string,
    total: number,
    timestamp: Date,
    status: OrderStatus,
    items: ICartItem[]
}