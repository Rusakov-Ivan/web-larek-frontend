
import { Component } from "../base/Component";
import { IBasket } from "../../types";
import { ensureElement, createElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { ICardActions } from "../../types";
import { IIndex, TProductInBasket } from "../../types";
  
  export class Basket extends Component<IBasket> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLElement;
  
    constructor(container: HTMLElement, protected events: IEvents) {
      super(container)
  
      this._list = ensureElement<HTMLElement>('.basket__list', container);
      this._total = container.querySelector('.basket__price');
      this._button = container.querySelector('.button');
  
      if(this._button) {
        this._button.addEventListener('click', () => {
          events.emit('order:open');
        });
      }
      this.items = [];
    }

    disableButton(value: string){
      this._button.setAttribute('disabled', value)
    };
  
    set items(items: HTMLElement[]) {
      if(items.length) {
        this._list.replaceChildren(...items);
        this.setDisabled(this._button, false);
      } else {
        this._list.replaceChildren(
          createElement<HTMLParagraphElement>('p', {
            textContent: 'Корзина пуста'
          }));
          this.disableButton('true');
      }
    }
  
    set total(total: number) {
      this.setText(this._total, `${total.toString()}` + ' синапсов');
    }
}

export class ProductInBasket extends Component<TProductInBasket | IIndex> {
  protected _index: HTMLElement;
  protected _title: HTMLElement;
  protected _price: HTMLElement;
  protected _button: HTMLButtonElement;
 
  constructor(container: HTMLElement, actions: ICardActions){
  super(container);

  this._index = ensureElement<HTMLElement>('.basket__item-index', container);
  this._title = ensureElement<HTMLElement>('.card__title', container);
  this._price = ensureElement<HTMLElement>('.card__price', container);
  this._button = container.querySelector('.basket__item-delete');
  this._button.addEventListener('click', actions.onClick);
}

set index (index: number) {
  this.setText(this._index, index);
}

set price(price: number) {
  this.setText(this._price, price)
}

set title(title: string) {
  this.setText(this._title, title)
}

}