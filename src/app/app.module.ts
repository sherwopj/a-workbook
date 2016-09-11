import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdIconModule } from '@angular2-material/icon';

import { ProductService } from './product.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdIconModule.forRoot()
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
