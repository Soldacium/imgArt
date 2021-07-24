import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ImageModificationComponent } from './image-modification/image-modification.component';
import { ButtonModeComponent } from './shared/components/button-mode/button-mode.component';
import { UploadPictureComponent } from './shared/components/upload-picture/upload-picture.component';
import { ButtonFlatDirective } from '@shared/directives/button-flat.directive';
import { InputRangeComponent } from '@components/input-range/input-range.component';
import { OptionsComponent } from '@components/options/options.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ImageModificationComponent,
    ButtonModeComponent,
    UploadPictureComponent,
    ButtonFlatDirective,
    InputRangeComponent,
    OptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
