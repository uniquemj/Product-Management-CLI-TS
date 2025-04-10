import { ICategory } from "./category.type"

export interface IProduct{
    p_id?: string,
    name?: string,
    price?: number,
    description?: string,
    category?: ICategory[],
    inventory?: number
}