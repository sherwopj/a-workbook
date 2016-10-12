import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { WorkflowListComponent } from './workflow-list/workflow-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
    { path: 'workflows', component: WorkflowListComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    // { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: 'products' }
];

export const routing = RouterModule.forRoot(appRoutes);