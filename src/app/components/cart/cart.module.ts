import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { cartRoutingModule } from './cart-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    cartRoutingModule,
    FormsModule
  ]
})
export class CartModule { }
