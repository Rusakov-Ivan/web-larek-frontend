# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Данные и типы данных

Продукт
```
interface IProduct {
    id: string,
    description: string,
    image: string,
    title: string,
    category: string,
    price: number | null
}
```
Заказ товара
```
interface IOrder {
    payment: number,
    address: string,
    email: string,
    phone: number,
    total: number,
    items: string[]
}
```
Результат заказа
```
interface IOrderResult {
    id: string,
    total: number 
}
```
Интерфейс для API
```
interface ILarekApi {
    getProducts(): Promise<ApiListResponse<IProduct>>
    getProduct(id: string): Promise<IProduct>
    }
```
Данные модального окна товара
```
type TProductInfo = IProduct
```
Данные товара в коризине
```
type TProductBakets = Pick<IProduct, 'id' | 'title' | 'price'>
```
Данные модального окна заказать товар
```
type TOrderInfo = Pick<IOrder, 'payment' | 'address'>
```
Вся информация заказа
```
type TOrderTotalInfo = Exclude<IOrder , 'items'>
```

