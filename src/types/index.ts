export interface IAppData {
	catalog: IProduct[];
	basket: IProduct[];
	order: IOrder;
	formErrors: TFormErrors;
}

export interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
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
	index: number;
}

export interface IModal {
	content: HTMLElement;
}

export interface IFormState {
	valid: boolean;
	errors: string[];
}

export interface IBasket {
	items: string[];
	total: number;
}

export interface IOrder {
	payment: string;
	address: string;
	email: string;
	phone: string;
}

export interface IOrderResult {
	id: string;
	total: number;
}

export interface IActions {
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
	'кнопка' = 'button',
}

export type TSuccess = Pick<IBasket, 'total'>;

export type TFormErrors = Partial<Record<keyof IOrder, string>>;
