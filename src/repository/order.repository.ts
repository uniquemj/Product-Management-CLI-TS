import path from 'path'
import { HelperUtils} from '../helper/utils.js'
import {CartRepository} from './cart.repository.js'
import { cartStorage } from './cart.repository.js'
import { ProductRepository, productStorage } from './product.repository.js'
import { IOrder } from '../types/order.type.js'
import { ICartItem, ICart } from '../types/cart.type.js'
import { IProduct } from '../types/product.type.js'

export const orderStorage = path.join(process.cwd(), 'data', 'orders.json')
const readFileHelper = HelperUtils.readFileHelper
const writeFileHelper = HelperUtils.writeFileHelper
const getRandomId =HelperUtils.getRandomId

export class OrderRepository{
    private readonly productRespository: ProductRepository
    private readonly cartRepository: CartRepository

    constructor(){
        this.productRespository = new ProductRepository()
        this.cartRepository = new CartRepository
    }


    getOrderList = async(user_id:string): Promise<string | IOrder>=>{
        try{
            const orders = await readFileHelper(orderStorage)
            const orderList = orders.find((order: IOrder)=>order.userId == user_id)
            
            if(!orderList){
                return 'Order with user id not found.'
            }
            return orderList
        }catch(e){
            await writeFileHelper(orderStorage, [])
            throw new Error("Error: Cart Item Fetch Failed.")
        }
    }
    
    createOrder = async(user_id: string): Promise<string> =>{
        const userCart = await this.cartRepository.getAllCart(user_id) as ICart[]
        const products = await this.productRespository.findAll()
        const userCartItems = userCart[0].items
        
        // this code handles updating inventory for product
        userCartItems.forEach((item: ICartItem)=>{
            const productIndex = products.findIndex((p_item: IProduct) =>p_item.p_id ==item.product.p_id)
            let product_inventory = products[productIndex].inventory as number
            if( product_inventory < 1){
                throw new Error("Product out of stock.")
            }
            product_inventory -= item.quantity!
            return item
        })
        
        await writeFileHelper(productStorage, products)
        
        //this code handles updating cart info with latest product inventory info
        const updateCarts = userCartItems.map((item: ICartItem)=>{
            const productIndex = products.findIndex((p_item: IProduct)=>p_item.p_id ==item.product.p_id)
            item.product = {p_id:products[productIndex].p_id as string, name: products[productIndex].name as string, price: products[productIndex].price as number}
            return item
        })
        
        const orderItems = {
            o_id: getRandomId(),
            userId:user_id,
            total: await this.cartRepository.total(user_id),
            timestamp: new Date(),
            status: "Pending",
            items: updateCarts,
        }
        try{
            const orders = await readFileHelper(orderStorage)
            orders.push(orderItems)
            await writeFileHelper(orderStorage, orders)
            await writeFileHelper(cartStorage, [])
            return 'Order Created.'
        } catch(e){
            await writeFileHelper(orderStorage, [orderItems])
            await writeFileHelper(cartStorage, [])
            return "Order Created."
        }
    }
    
    updateStatus = async(orderId:string, userId:string, status:string): Promise<string> =>{
        try{
            const orders = await readFileHelper(orderStorage)
            const orderIndex = orders.findIndex((item: IOrder) => item.o_id == orderId)
            const userOrder = orders.find((item: IOrder) => item.userId ==userId)
            userOrder['status'] = status
            orders[orderIndex] = userOrder
            await writeFileHelper(orderStorage, orders)
            return "Status Updated"
        } catch (e) {
            throw new Error("Status Update Failed.")
        }
    }
}
    