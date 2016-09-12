import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MdIconModule } from '@angular2-material/icon';
import { Logger } from 'angular2-logger/core';

import { ProductService } from './product.service';
import { BackendService } from './backend.service';


import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';

import { HomeBannerComponent } from './home-banner/home-banner.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent, HomeBannerComponent, ProductListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdIconModule.forRoot(),
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [ProductService, BackendService, Logger],
  bootstrap: [AppComponent]
})
export class AppModule { }
