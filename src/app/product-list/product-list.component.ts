import {Component, OnInit} from '@angular/core';

// import {MdButton} from '@angular2-material/button';
// import {MdCard,MdCardModule,MdCardActions,MdCardContent,MdCardHeader,MdCardSubtitle,MdCardTitle,MdCardTitleGroup} from '@angular/material';

import {Product} from '../product';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService],
})

export class ProductListComponent implements OnInit {
  errorMessage: string;
  products: Product[];
  mode = 'Observable';
  constructor (private productService: ProductService) {}
  
  ngOnInit() { this.getProducts(); }
  
  getProducts() {
    this.productService.getProducts()
                     .subscribe(
                       products => this.products = products,
                       error =>  this.errorMessage = <any>error);
    
    }
  
  // addproduct (name: string) {
  //   if (!name) { return; }
  //   this.productService.addproduct(name)
  //                    .subscribe(
  //                      product  => this.Products.push(product),
  //                      error =>  this.errorMessage = <any>error);
  // }
}