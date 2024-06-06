import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from 'src/app/core/home/home.component';
import { LoggedOutGuard } from 'src/app/core/guards/logged-out.guard';
import { LoggedInGuard } from 'src/app/core/guards/logged-in.guard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'home',  component: HomeComponent },
    { path: 'login', loadChildren: './authentication/authentication.module#AuthenticationModule', canActivate: [LoggedOutGuard] },
    { path: 'products', loadChildren: '../products/products.module#ProductsModule', canActivate: [LoggedInGuard] },
    { path: 'users', loadChildren: '../users/users.module#UsersModule', canActivate: [LoggedInGuard] }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);