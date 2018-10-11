import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from 'src/app/core/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: '**', redirectTo: 'home' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);