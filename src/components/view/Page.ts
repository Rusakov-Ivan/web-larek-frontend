import { Component } from "../base/Component";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";
import { IPage } from "../../types";

export class Page extends Component<IPage> {
  protected _counter: HTMLElement;
  protected _basket: HTMLElement;
  protected _catalog: HTMLElement;
  protected _wrapper: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._counter = ensureElement<HTMLElement>('.header__basket-counter', container);
    this._catalog = ensureElement<HTMLElement>('.gallery', container);
    this._wrapper = ensureElement<HTMLElement>('.page__wrapper', container);
    this._basket = ensureElement<HTMLElement>('.header__basket', container);

    this._basket.addEventListener('click', () => {
      this.events.emit('basket:open');  
    });
  }

  set counter(value: number) {
    this.setText(this._counter, String(value));
}

set catalog(items: HTMLElement[]) {
    this._catalog.replaceChildren(...items);
}

set locked(isLocked: boolean) {
  this.toggleClass(this._wrapper, 'page__wrapper_locked', isLocked);
}
}