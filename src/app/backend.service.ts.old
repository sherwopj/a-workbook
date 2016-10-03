import { Injectable, Type } from '@angular/core';

import { Logger } from 'angular2-logger/core';
import { Product } from './product';

const PRODUCTS = [
    new Product("dress","http://www.lindybopusa.com/images/products/zoom/1451996298-20103300.jpg",23.99,"female"),
    new Product("cowboy boots","http://www.alphahacks.com/wp-content/uploads/2013/06/Best-Cowboy-Boots.jpg",99.99,"male"),
    new Product("wellington boots", "http://www.nancyblacks.co.uk/image/cache/data/IMAGES/_0025-441x441.jpg", 45.99, "male"),
    new Product("shorts", "http://www.wigglestatic.com/product-media/5360112002/Altura-Cadence-Baggy-Shorts-Baggy-Cycling-Shorts-Black-SS16-AL30CDBGBS.jpg?w=430&h=430&a=7", 19.99, "male"),
    new Product("shorts", "http://picture-cdn.wheretoget.it/8ay93l-i.jpg", 17.49, "female"),
    new Product("coat", "http://www.dufflecoatsuk.co.uk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/o/womens_check_duffle_coat_red.jpg", 55.49, "female"),
    new Product("coat", "http://www.originalmontgomery.com/media/catalog/product/cache/1/image/17f82f742ffe127f42dca9de82fb58b1/m/e/mens_london_duffle_navy.jpg", 45.49, "male")
  ];

@Injectable()
export class BackendService {
  constructor(private logger: Logger) {}

  getAll(type: Type): PromiseLike<any[]> {
    if (type === Product) {
      // TODO get from the database
      return Promise.resolve<Product[]>(PRODUCTS);
    }
    let err = new Error('Cannot get object of this type');
    this.logger.error(err);
    throw err;
  }

  getFavorites(type: Type): PromiseLike<any[]> {
    if (type === Product) {
      // TODO get from the database
      return Promise.resolve<Product[]>(PRODUCTS);
    }
    let err = new Error('Cannot get object of this type');
    this.logger.error(err);
    throw err;
  }

}