export interface ICartProduct{
    p_id: string,
    name: string,
    price: number
}

export interface ICartItem{
    product: ICartProduct,
    quantity?:number
}

export interface ICart{
    c_id?:string,
    userId?:string,
    items: ICartItem[]
}