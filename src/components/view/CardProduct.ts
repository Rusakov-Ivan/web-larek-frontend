import { Component } from "../base/Component";
import { ICardActions, ICardProduct, ProductCategory} from "../../types";
import { ensureElement } from "../../utils/utils";


export class CardProduct extends Component<ICardProduct> {
    
protected _title: HTMLElement;
protected _image: HTMLImageElement;
protected _category: HTMLElement;
protected _price: HTMLElement;
protected _button: HTMLButtonElement;
protected _description: HTMLElement;


constructor (container: HTMLElement, actions: ICardActions) {
    super(container);
    
    
    this._title = ensureElement<HTMLElement>('.card__title', container);
    this._image = ensureElement<HTMLImageElement>('.card__image', container);
    this._price = ensureElement<HTMLElement>('.card__price', container);
    this._category = ensureElement<HTMLElement>('.card__category', container);
    this._description = container.querySelector('.card__text');
    this._button = container.querySelector('.card__button');


    if (actions?.onClick) {
        if (this._button) {
            this._button.addEventListener('click', actions.onClick);
        }else {
            container.addEventListener('click', actions.onClick);
        }
    }
}

set category(value: keyof typeof ProductCategory) {
    if (this._category) {
        this.setText(this._category, value);
        const categoryStyle = `card__category_${ProductCategory[value]}`;
        this._category.classList.add(categoryStyle);
    }
}

set title(value: string) {
    this.setText(this._title, value);

}

set image(value: string) {
 this.setImage(this._image, value);   
}

set price(value: number | null) {
  this.setText(this._price, (value) ? `${value.toString()} синапсов` : 'Бесценно');

  }


  set description(value: string | string[]) {
    if (Array.isArray(value)) {
      this._description.replaceWith(...value.map(str => {
        const descTemplate = this._description.cloneNode() as HTMLElement;
        this.setText(descTemplate, str);
        return descTemplate;
      }))
    } else {
      this.setText(this._description, value);
    }
  }
  set state (state: boolean) {
    if(this._button){
      if(this._price.textContent === 'Бесценно'){
        this.setText(this._button, 'Недоступно')
        this.setDisabled(this._button, true)
      }
    }
  }
}

