import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CategoryComponent } from './category/category.component';
import { FormsModule } from '@angular/forms';
import { GlobalsearchproductsComponent } from './globalsearchproducts/globalsearchproducts.component';
import { PaymentComponent } from './payment/payment.component';

// import { RouterModule } from '@angular/router';





@NgModule({
  declarations: [HomeComponent,NavbarComponent,CarouselComponent,CategoryComponent, GlobalsearchproductsComponent, PaymentComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
    // RouterModule
  ]
})
export class HomeModule { }
