import { ApiListResponse } from "../components/base/api"

export interface IProduct {
    id: string,
    description: string,
    image: string,
    title: string,
    category: string,
    price: number | null
}


export interface IOrder {
    payment: number,
    address: string,
    email: string,
    phone: number,
    total: number,
    items: string[]
}

export interface IOrderResult {
    id: string,
    total: number 
}

export interface ILarekApi {
    getProducts(): Promise<ApiListResponse<IProduct>>
    getProduct(id: string): Promise<IProduct>
    createOrder(order: IOrder): Promise<IOrderResult>
    }

export type TProductInfo = IProduct

export type TProductBakets = Pick<IProduct, 'id' | 'title' | 'price'>

export type TOrderInfo = Pick<IOrder, 'payment' | 'address'>

export type TOrderTotal = Exclude<IOrder , 'items'>

