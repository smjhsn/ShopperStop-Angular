import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { CategoryComponent } from './components/home/category/category.component';
import { CarouselComponent } from './components/home/carousel/carousel.component';
import { LoginGuard } from './authguard/login.guard';
import { CartComponent } from './components/cart/cart.component';
import { AdminProductInsertComponent } from './components/admin-product-insert/admin-product-insert.component';
import { AdminGuard } from './authguard/admin.guard';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';



const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',loadChildren:()=>import('./components/home/home.module').then(m=>m.HomeModule)},
  {path:'login',component:LoginpageComponent},
  {path:'register',component:RegisterComponent},
  {path:'cart',loadChildren:()=>import('./components/cart/cart.module').then(m=>m.CartModule),canActivate:[LoginGuard]},
  {path:"productInsert",component:AdminProductInsertComponent,canActivate:[AdminGuard]},
  {path:'**',component:ErrorpageComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})

export class AppRoutingModule { }
