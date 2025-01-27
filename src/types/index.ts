export interface IAppData {
    catalog: IProduct[]
    basket: IProduct[]
    order: IOrder
}

export interface IPage {
    counter: number
    catalog: HTMLElement[]
    locked: boolean
}

export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
	
}

export interface ICardProduct extends IProduct {
	button: string;
	state: boolean;
}

export interface IModal {
    content: HTMLElement
}

 export interface IFormState {
    valid: boolean
    errors: string[]
}

export interface IBasket {
    items: HTMLElement[]
    total: number
}


export interface IIndex {
	index: number;
}

export interface IContacts {
	email: string;
	phone: string;
}

export interface IOrder extends IContacts {
	payment: string;
	address: string;
	total: number;
	items: string[];
}

export interface IOrderResult {
	id: string;
	total: number;
}

export interface ISuccess {
	total: number;
}

export interface ISuccessActions {
	onClick: () => void;
}

export interface ICardActions {
    onClick: (event: MouseEvent) => void;
}


export interface ILarekApi {
	getProducts: () => Promise<IProduct[]>;
	createOrder: (order: IOrder) => Promise<IOrderResult>;
}

export enum ProductCategory {
	'софт-скил' = 'soft',
	'другое' = 'other',
	'хард-скил' = 'hard',
	'дополнительное' = 'additional',
	'кнопка' = 'кнопка'
}

export type TProductInBasket = Pick<IProduct, 'id' | 'title' | 'price'>;

export type TFormErrors = Partial<Record<keyof IOrder, string>>;
