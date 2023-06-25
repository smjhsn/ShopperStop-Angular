import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MensComponent } from './category/mens/mens.component';
import { WomensComponent } from './category/womens/womens.component';
import { KidsComponent } from './category/kids/kids.component';
import { CarouselComponent } from './carousel/carousel.component';
import { GlobalsearchproductsComponent } from './globalsearchproducts/globalsearchproducts.component';
import { PaymentComponent } from './payment/payment.component';

const routes:Routes = [
    // {path:'carousel',component:CarouselComponent},
    {path:'',component:HomeComponent,
    children:[
        {path:'',component:CarouselComponent},
        {path:'mens',component:MensComponent},
        {path:'womens',component:WomensComponent},
        {path:'kids',component:KidsComponent},
        {path:"search-products",component:GlobalsearchproductsComponent},
        {path:"payment",component:PaymentComponent}
    ]},
    
];

@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports : [RouterModule]
})
export class HomeRoutingModule {}