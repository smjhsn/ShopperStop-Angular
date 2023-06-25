import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/home/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { CategoryComponent } from './components/home/category/category.component';
import { CarouselComponent } from './components/home/carousel/carousel.component';
import { MensComponent } from './components/home/category/mens/mens.component';
import { WomensComponent } from './components/home/category/womens/womens.component';
import { KidsComponent } from './components/home/category/kids/kids.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RouterModule } from '@angular/router';
import { LoginGuard } from './authguard/login.guard';
import { AdminProductInsertComponent } from './components/admin-product-insert/admin-product-insert.component';
import { AdminGuard } from './authguard/admin.guard';




@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    ErrorpageComponent,
    RegisterComponent,
    MensComponent,
    WomensComponent,
    KidsComponent,
    AdminProductInsertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [LoginGuard,AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
