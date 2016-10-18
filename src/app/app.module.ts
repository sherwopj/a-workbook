import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';


import { AppComponent } from './app.component';
import { routing } from './app.routing';


import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, DebugService } from './_services/index';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { WorkflowListComponent } from './workflow-list/workflow-list.component';
import { UserComponent } from './user/user.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { DebugComponent } from './debug/debug.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductListComponent,
    AlertComponent,
    WorkflowListComponent,
    UserComponent,
    TicketListComponent,
    DebugComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    routing
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    DebugService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
