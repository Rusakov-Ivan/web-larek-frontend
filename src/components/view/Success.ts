import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';
import { TSuccess, ISuccessActions } from '../../types';

export class Success extends Component<TSuccess> {
	protected _description: HTMLElement;
	protected _buttonClose: HTMLElement;

	constructor(container: HTMLElement, actions: ISuccessActions) {
		super(container);

		this._description = ensureElement<HTMLElement>('.order-success__description', container);
		this._buttonClose = ensureElement<HTMLElement>('.order-success__close', container);

		if (actions?.onClick) {
			this._buttonClose.addEventListener('click', actions.onClick);
		}
	}

	set total(value: number) {
		this._description.textContent = `Списано ${value} синапсов`;
	}
}