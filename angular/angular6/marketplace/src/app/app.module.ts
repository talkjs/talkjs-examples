import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { CoreModule } from 'src/app/core/core.module';
import { routing } from 'src/app/app.routing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    routing
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
