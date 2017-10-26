# syliuspwaexample

> a Sylius PWA Demo Shop 

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Configuration

configuration for [Sylius DemoShop Api](http://demo.sylius.org)
 
```
# src/config/index.js

export default {
    appName: 'Sylius PWA',
    imageUrl: 'http://demo.sylius.org/media/image/',
    apiUrl: 'http://demo.sylius.org/shop-api',
    apiChannel: 'US_WEB',
    apiLocale: 'en_GB'
}
```
