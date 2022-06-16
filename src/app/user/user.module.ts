import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './components/accueil/accueil.component';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { PanierComponent } from './components/panier/panier.component';
import { ConfirmOrderComponent } from './components/confirm-order/confirm-order.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AccueilComponent,
    MenuComponent,
    PanierComponent,
    ConfirmOrderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    FormsModule
  ],
  exports: [
    PanierComponent
  ]
})
export class UserModule { }
