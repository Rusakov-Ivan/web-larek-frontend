import { Form } from './Form';
import { IOrder} from '../../types';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

export class Order extends Form<IOrder> {
	
	protected _buttonPaymentOnline: HTMLButtonElement;
	protected _buttonPaymentCash: HTMLButtonElement;
	protected _inputAddress: HTMLInputElement;
	protected _buttonSubmit: HTMLButtonElement;

	constructor(container: HTMLFormElement, protected events: IEvents) {
		super(container, events);

		this._buttonPaymentOnline = ensureElement<HTMLButtonElement>(
			'.button_alt[name=card]',
			this.container
		);
		this._buttonPaymentCash = ensureElement<HTMLButtonElement>(
			'.button_alt[name=cash]',
			this.container
		);
		this._inputAddress = ensureElement<HTMLInputElement>(
			'.form__input[name=address]',
			this.container
		);
		this._buttonSubmit = ensureElement<HTMLButtonElement>(
			'.button[type=submit]',
			this.container
		);

		 this._buttonPaymentOnline.addEventListener('click', () => {
			this.onInputChange('payment', 'card');
			
		 });

		 this._buttonPaymentCash.addEventListener('click', () => {
			this.onInputChange('payment', 'cash');
		 });

		this._buttonSubmit.addEventListener('click', () => {
			events.emit('contacts:open');
		});
	}
	
	 set payment(value: string) {
	 	 this.toggleClass(this._buttonPaymentOnline, 'button_alt-active', value === 'card');
	 	 this.toggleClass(this._buttonPaymentCash, 'button_alt-active', value === 'cash');
	 }

	set address(value: string) {
		this._inputAddress.value = value;
	}
}
