import { Model } from '../base/Model';
import { IAppData, IProduct, IOrder, TFormErrors } from '../../types';

export class AppData extends Model<IAppData> {
	protected _catalog: IProduct[];
	protected _basket: IProduct[] = [];
	protected _order: IOrder;
	protected _formErrors: TFormErrors = {};

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

	stateCard(product: IProduct): boolean {
		if (this._basket.some((item) => item === product)) {
			return true
		}
	}

	addProductToBasket(product: IProduct) {
		if (!this._basket.some((item) => item === product)) {
			this._basket.push(product);
			this.emitChanges('basket:changed', { basket: this._basket });
			
		}
	}

	removeProductFromBasket(product: IProduct) {
		const index = this._basket.indexOf(product);
		if (index >= 0) {
			this._basket.splice(index, 1);
		}
		this.emitChanges('basket:changed', { basket: this._basket });
	}

	getBasketCount() {
		return this._basket.length;
	}

	getPaymentMethod() {
		return this._order.payment;
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

		if (!this._order.payment) {
			errors.payment = 'Необходимо выбрать способ оплаты';
		} else if (!this._order.address) {
			errors.address = 'Необходимо указать адрес дотавки';
		}

		if (!this._order.email) {
			errors.email = 'Необходимо указать адрес электроной почты';
		} else if (!this._order.phone) {
			errors.phone = 'Необходимо указать номер телефона';
		}

		this._formErrors = errors;
		this.events.emit('formErrors:changed', this._formErrors);
		return Object.keys(errors).length === 0;
	}
}
