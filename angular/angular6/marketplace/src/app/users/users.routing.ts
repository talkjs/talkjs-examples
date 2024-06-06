import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core/src/metadata/ng_module";

import { UserProfileComponent } from "src/app/users/components/user-profile/user-profile.component";
import { UserListComponent } from "src/app/users/components/user-list/user-list.component";

export const routes: Routes = [
    { path: '', component: UserListComponent },
    { path: ':id', component: UserProfileComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);