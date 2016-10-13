import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { WorkflowListComponent } from './workflow-list/workflow-list.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'workflows', component: WorkflowListComponent, canActivate: [AuthGuard] },
    { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard] },


    // otherwise redirect to home
    { path: '**', redirectTo: 'products' }
];

export const routing = RouterModule.forRoot(appRoutes);