
import { Component } from "../base/Component";
import { IBasket } from "../../types";
import { ensureElement, createElement } from "../../utils/utils";
import { IEvents } from "../base/events";

  
  export class Basket extends Component<IBasket> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLButtonElement;
  
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

