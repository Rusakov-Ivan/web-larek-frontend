import { IEvents } from '../base/events';
import { Model } from '../base/Model';
import { IAppData, IProduct, IOrder, TFormErrors } from '../../types';

export class AppData extends Model<IAppData> {
	protected _catalog: IProduct[];
	protected _basket: IProduct[];
	protected _order: IOrder;
	protected _formErrors: TFormErrors = {};

	constructor(
		data: Partial<IAppData>,
		protected events: IEvents,
		products: IProduct[],
		basket: IProduct[],
		order: IOrder
	) {
		super(data, events);

		this._catalog = products;
		this._basket = basket;
		this._order = order;
	}

	getCatalog() {
		return this._catalog;
	}

	setCatalog(products: IProduct[]) {
		this._catalog = products;
		this.emitChanges('products:changed', { products: this._catalog });
	}

	getBasket() {
		return this._basket;
	}

	addProductToBasket(product: IProduct) {
		this._basket.push(product);
		this.emitChanges('basket:changed', { basket: this._basket });
	}

	removeProductFromBasket(product: IProduct) {
		const index = this._basket.indexOf(product);
		if (index >= 0) {
			this._basket.splice(index, 1);
		}
		this.emitChanges('basket:changed', { basket: this._basket });
	}

	getTotalPrice() {
		return this._basket.reduce((acc, item) => acc + item.price, 0);
	}

	getOrder() {
		return this._order;
	}

	clearBasket() {
		this._basket = [];
		this.emitChanges('basket:changed', { basket: this._basket });
	}

	clearOrder() {
		this._order = {
			email: '',
			phone: '',
			payment: null,
			address: '',
			items: [],
			total: 0,
		};
		this.emitChanges('order:changed', { order: this._order });
	}

	setOrderField(
		field: Exclude<keyof IOrder, 'total' | 'items'>,
		value: string
	) {
		this._order[field] = value;
		if (this.validateOrder()) {
			this.events.emit('order:ready', this._order);
		}
	}

	validateOrder() {
		const errors: typeof this._formErrors = {};
		const addressError = /^[а-яА-ЯёЁa-zA-Z]{7,}$/;
		const phoneError = /^\+7\d{10}$/;
		const emailError = /^\S+@\S+\.\S+$/;

		if (!this._order.payment) {
			errors.payment = 'Необходимо выбрать способ оплаты';
		} else if (!addressError.test(this._order.address)) {
			errors.address = 'Необходимо указать адрес дотавки';
		}

		if (!emailError.test(this._order.email)) {
			errors.email = 'Необходимо указать адрес электроной почты';
		} else if (!phoneError.test(this._order.phone)) {
			errors.phone = 'Необходимо указать номер телефона';
		}

		this._formErrors = errors;
		this.events.emit('formErrors:changed', this._formErrors);
		return Object.keys(errors).length === 0;
	}
}
