import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from 'src/app/core/core.routing';
import { NavComponent } from 'src/app/core/nav/nav.component';

import { HomeComponent } from 'src/app/core/home/home.component';
import { ProductService } from 'src/app/core/services/product.service';

@NgModule({
  imports: [
    CommonModule,
    routing,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbAlertModule
  ],
  declarations: [NavComponent, HomeComponent],
  exports: [NavComponent, HomeComponent]
})
export class CoreModule {
  /* Make sure the CoreModule is imported only once within the application, by the AppModule */
  /* We're injecting the ProductService so it initializes the mock objects. */
  constructor (
    @Optional() @SkipSelf() parentModule: CoreModule, 
    private toastrService: ToastrService,
    private productService: ProductService) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }

    this.toastrService.toastrConfig.positionClass = 'toast-bottom-right';
  }
}
