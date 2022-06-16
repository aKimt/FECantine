import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './components/accueil/accueil.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AccueilComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AdminModule { }
