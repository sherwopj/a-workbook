import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Product } from './product';

@Injectable()
export class ProductService {

  constructor(private http: Http) { }

  private productServiceUrl = 'http://localhost:3000/products';  // URL to web API

  getProducts(): Observable<Product[]> {
    return this.http.get(this.productServiceUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    console.log("getting products");
    return body || {};
  }
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
