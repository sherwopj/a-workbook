import {Component} from '@angular/core';
import './rxjs-operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [],
})
export class AppComponent {
  formShowing: boolean = false;
  views: Object[] = [
    {
      name: "Home",
      description: "Take me Home",
      icon: "home",
      routerLink: ""
    },
    {
      name: "Product List",
      description: "Show me the products!",
      icon: "view_module",
      routerLink: "products/"
    }
  ];
  // products: Object[] = [
  //   {name: "dress", imageUrl: "http://www.lindybopusa.com/images/products/zoom/1451996298-20103300.jpg", price: "23.99", sex: "female"},
  //   {name: "cowboy boots", imageUrl: "http://www.alphahacks.com/wp-content/uploads/2013/06/Best-Cowboy-Boots.jpg", price: "99.99", sex: "male"},
  //   {name: "wellington boots", imageUrl: "http://www.nancyblacks.co.uk/image/cache/data/IMAGES/_0025-441x441.jpg", price: "45.99", sex: "male"},
  //   {name: "shorts", imageUrl: "http://www.wigglestatic.com/product-media/5360112002/Altura-Cadence-Baggy-Shorts-Baggy-Cycling-Shorts-Black-SS16-AL30CDBGBS.jpg?w=430&h=430&a=7", price: "19.99", sex: "male"},
  //   {name: "shorts", imageUrl: "http://picture-cdn.wheretoget.it/8ay93l-i.jpg", price: "17.49", sex: "female"},
  //   {name: "coat", imageUrl: "http://www.dufflecoatsuk.co.uk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/o/womens_check_duffle_coat_red.jpg", price: "55.49", sex: "female"},
  //   {name: "coat", imageUrl: "http://www.originalmontgomery.com/media/catalog/product/cache/1/image/17f82f742ffe127f42dca9de82fb58b1/m/e/mens_london_duffle_navy.jpg", price: "45.49", sex: "male"}
  // ];
}
