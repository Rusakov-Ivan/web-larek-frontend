import { IOrder } from '../../types';
import { Form } from './Form';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

export class Contacts extends Form<IOrder> {

	protected _buttonSubmit: HTMLButtonElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	
		this._buttonSubmit = ensureElement<HTMLButtonElement>( '.button[type=submit]', container);

		 this._buttonSubmit.addEventListener('click', () => {
		 	events.emit('order:submit');
		 });
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}
}