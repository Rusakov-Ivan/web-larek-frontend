import './scss/styles.scss';

import { LarekApi} from './components/model/LarekApi';
import { API_URL, CDN_URL } from './utils/constants';
import { AppData} from './components/model/AppData';
import { EventEmitter } from './components/base/events';
import { cloneTemplate, ensureElement } from './utils/utils';
import { CardProduct } from './components/view/CardProduct';
import { Page } from './components/view/Page';
import {  IOrder, IProduct } from './types';
import { Modal } from './components/view/Modal';
import { Basket,} from './components/view/Basket';
import { ProductInBasket } from './components/view/ProductInBasket';
import { Contacts } from './components/view/Contacts';
import { Order } from './components/view/Order';
import { Success } from './components/view/Success';

// Темплейты
const cardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
const productModal = ensureElement<HTMLTemplateElement>('#card-preview');
const basketModal = ensureElement<HTMLTemplateElement>('#basket');
const productToBasket = ensureElement<HTMLTemplateElement>('#card-basket');
const orderModal = ensureElement<HTMLTemplateElement>('#order');
const contactsModal = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);
const appData = new AppData({}, events, [], [], {
	email: '',
	phone: '',
	payment: null,
	address: '',
	items: [],
	total: 0
});

// Контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketModal), events);
const addressForm = new Order(cloneTemplate(orderModal), events); 
const contactsForm = new Contacts(cloneTemplate(contactsModal), events);



// Получение списка продуктов
events.on('products:changed', () => {
	page.catalog = appData.getCatalog().map(item => {
		const product = new CardProduct(cloneTemplate(cardCatalog), {
			onClick: () => {
				events.emit('product:openModal', item);
			}
		});
		return product.render({
			id: item.id,
			title: item.title,
			image: item.image,
			category: item.category,
			price: item.price
		});
	});
})

// Открытие модального окна товара
events.on('product:openModal', (product: IProduct) => {
	const card = new CardProduct(cloneTemplate(productModal), {

		onClick: () => {
			events.emit('product:addToBasket', product)
		}
	})
	modal.render({
		content: card.render({
			title: product.title,
			image:  product.image,
			category: product.category,
			description: product.description,
			price: product.price,
			state: product.price === null
		}),
	})
})

// Открытие корзины
events.on('basket:open', () => {
	modal.render({
	  content: basket.render()
	})
  });

  // Добавление продукта в корзину
  events.on('product:addToBasket', (product: IProduct) => {
	appData.addProductToBasket(product);
	page.counter = appData.getBasket().length;
	modal.close()
})

// Удаление продукта из корзины
events.on('product:removeFromBasket', (product: IProduct) => {
	appData.removeProductFromBasket(product);
	page.counter = appData.getBasket().length;
})
  
//Изменение корзины
events.on('basket:changed', () => {
	basket.total = appData.getTotalPrice();
	basket.items = appData.getBasket().map((item, index) => {
		const product = new ProductInBasket(cloneTemplate(productToBasket), {
			onClick: () => events.emit('product:removeFromBasket', item)
		});

		return product.render({
			index: index + 1,
			id: item.id,
			title: item.title,
			price: item.price
		});
	});
})

// Изменилось состояние валидации формы
events.on('formErrors:changed', (errors: Partial<IOrder>) => {
    const {payment, address, email, phone } = errors;
	addressForm.valid = !payment && !address
	addressForm.errors = Object.values({payment, address}).filter(i => !!i).join(' ');
    contactsForm.valid = !email && !phone;
    contactsForm.errors = Object.values({email, phone}).filter(i => !!i).join(' ');
});

// Изменилось одно из полей
events.on(/(^order|^contacts)\..*:change/, (data: { field: keyof Omit< IOrder, 'items' | 'total'>, value: string }) => {
    appData.setOrderField(data.field, data.value);
});

// Оформление заказа 
events.on('order:open', () => {
	modal.render({
		content: addressForm.render({
			payment: '',
			address: '',
			valid: false,
			errors: [],
		}),
	});
})

events.on('contacts:open', () => {
	modal.render({
		content: contactsForm.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	})
})

// Отправление заказа
events.on('order:submit', () => {
api.createOrder({
 ...appData.getOrder(),
 total: appData.getTotalPrice(),
 items: appData.getBasket().map(item => item.id)
})
.then (() => {
	const successModal = new Success(cloneTemplate(successTemplate), events)

	modal.content = successModal.render({
		total: appData.getTotalPrice()
	})
	appData.clearBasket(),
	appData.clearOrder(),
	page.counter = appData.getBasket().length
})
.catch(err => console.error(err))
 })

 // Закрытие модального окна успешной покупки
 events.on('success:close', () => {
	modal.close()
 })

// Блокировка скроллинга при открытии модального окна
events.on('modal:open', () => {
	page.locked = true; 
  });
  
  events.on('modal:close', () => {
	page.locked = false; 
  });
  
  // Получение списка продуктов
  api.getProducts()
  .then(data => {appData.setCatalog(data)})
  .catch(err => console.error(err));
