import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core/src/metadata/ng_module";

import { ProductListComponent } from "src/app/products/components/product-list/product-list.component";
import { ProductPageComponent } from "src/app/products/components/product-page/product-page.component";

export const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: ':id', component: ProductPageComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);