import { Injectable } from '@angular/core';
import { Product } from './product';
import { BackendService } from './backend.service';
import { Logger } from 'angular2-logger/core';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  constructor(
    private backend: BackendService,
    private logger: Logger) { }

  getProducts() {
    this.backend.getAll(Product).then( (products: Product[]) => {
      this.logger.log(`Fetched ${products.length} products.`);
      this.products.push(...products); // fill cache
    });
    return this.products;
  }
}
