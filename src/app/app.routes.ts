import { Routes } from '@angular/router';
import { StorefrontComponent } from './pages/storefront/storefront.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', component: StorefrontComponent}
];
