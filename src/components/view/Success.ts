import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';
import { TSuccess } from '../../types';
import { IEvents } from '../base/events';

export class Success extends Component<TSuccess> {
	protected _description: HTMLElement;
	protected _buttonClose: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._description = ensureElement<HTMLElement>('.order-success__description', container);
		this._buttonClose = container.querySelector('.order-success__close');

		this._buttonClose.addEventListener('click', () => {
			events.emit('success:close');
		})
	}

	set total(value: number) {
		this.setText(this._description,  `Списано ${value.toString()} синапсов`);
	}
}