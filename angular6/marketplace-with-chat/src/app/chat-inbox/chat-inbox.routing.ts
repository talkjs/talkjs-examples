import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core/src/metadata/ng_module";

import { InboxComponent } from "src/app/chat-inbox/components/inbox/inbox.component";

export const routes: Routes = [
    { path: '', component: InboxComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);