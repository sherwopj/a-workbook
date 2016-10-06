import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: ProductListComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    // { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);