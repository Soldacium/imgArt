import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ImageModificationComponent } from './image-modification/image-modification.component';
import { ButtonModeComponent } from './shared/components/button-mode/button-mode.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ImageModificationComponent,
    ButtonModeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
