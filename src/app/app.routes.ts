import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product-list/product-list.component';

export const AppRoutes = [
  { path: '', component: LoginComponent },
  { path: 'products', component: ProductListComponent }
];