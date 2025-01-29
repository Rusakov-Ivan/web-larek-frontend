
import { ICardActions } from "../../types";
import { IIndex, TProductInBasket } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

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