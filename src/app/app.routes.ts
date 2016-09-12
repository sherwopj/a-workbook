import { HomeBannerComponent } from './home-banner/home-banner.component';
import { ProductListComponent } from './product-list/product-list.component';

export const AppRoutes = [
  { path: '', component: HomeBannerComponent },
  { path: 'products', component: ProductListComponent }
];