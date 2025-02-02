import { Component } from '../base/Component';
import { IActions, ICardProduct, ProductCategory } from '../../types';
import { ensureElement } from '../../utils/utils';

export class CardProduct extends Component<ICardProduct> {
	protected _title: HTMLElement;
	protected _image: HTMLImageElement;
	protected _category: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;
	protected _description: HTMLElement;

	constructor(container: HTMLElement, actions: IActions) {
		super(container);

		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);
		this._image = container.querySelector('.card__image');
		this._category = container.querySelector('.card__category');
		this._description = container.querySelector('.card__text');
		this._button = container.querySelector('.card__button');

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set category(value: keyof typeof ProductCategory) {
		if (this._category) {
			this.setText(this._category, value);
			this._category.className = `card__category card__category_${ProductCategory[value]}`;
		}
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set image(value: string) {
		this.setImage(this._image, value);
	}

	set price(value: number | null) {
		this.setText(
			this._price,
			value ? `${value.toString()} синапсов` : 'Бесценно'
		);
	}

	set description(value: string | string[]) {
		if (Array.isArray(value)) {
			this._description.replaceWith(
				...value.map((str) => {
					const descTemplate = this._description.cloneNode() as HTMLElement;
					this.setText(descTemplate, str);
					return descTemplate;
				})
			);
		} else {
			this.setText(this._description, value);
		}
	}

	set state(state: boolean) {
		if (this._button) {
			if (this._price.textContent === 'Бесценно') {
				this.setText(this._button, 'Недоступно');
				this.setDisabled(this._button, true);
			} else if (state) {
				this.setText(this._button, 'В корзинe');
				this.setDisabled(this._button, true);
			} else {
				this.setText(this._button, 'В корзину');
				this.setDisabled(this._button, state);
			}
		}
	}
}

export class ProductInBasket extends CardProduct {
	protected _index: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: IActions) {
		super(container, actions);
		this._index = ensureElement<HTMLElement>('.basket__item-index', container);
		this._button = container.querySelector('.basket__item-delete');

		if (actions?.onClick) {
			this._button.addEventListener('click', actions.onClick);
		}
	}

	set index(index: number) {
		this.setText(this._index, index);
	}
}
