import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageModificationComponent } from './image-modification/image-modification.component';

const routes: Routes = [
  {
    path: '',
    component: ImageModificationComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
