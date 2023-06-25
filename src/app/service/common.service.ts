import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  url:any="https://excessive-radical-feast.glitch.me/category";
  carousleimage1:any="https://excessive-radical-feast.glitch.me/carouselImages1";
  carousleimage2:any="https://excessive-radical-feast.glitch.me/carouselImages2";
  menProductURL:any="https://excessive-radical-feast.glitch.me/mensProduct";
  menCategory:any="https://excessive-radical-feast.glitch.me/menscategory";
  womenProductURL:any="https://excessive-radical-feast.glitch.me/womensProduct";
  womenCategory:any="https://excessive-radical-feast.glitch.me/womenscategory";
  kidProductURL:any="https://excessive-radical-feast.glitch.me/kidsProduct";
  kidCategory:any="https://excessive-radical-feast.glitch.me/kidscategory";
  registerDetails:any="https://excessive-radical-feast.glitch.me/registerDetails";
  cartIds:any='https://excessive-radical-feast.glitch.me/cartIds';
  //=====================================================
  searchBarValue:any[]=[];
  // searchButtonclicked:Subject<boolean> = new Subject<boolean>();
  searchButtonclicked:any;
  //=================================================
  kids:boolean =false;
  constructor(private accessServer:HttpClient) { }
  // getsearch(){
  //   return this.searchBarValue;
  // }
  getCategory(){
    return this.accessServer.get(this.url);
  }
  getCarouselImage1(){
    return this.accessServer.get(this.carousleimage1);
  }
  getCarouselImage2(){
    return this.accessServer.get(this.carousleimage2); 
  }
  getMensProduct(){
    return this.accessServer.get(this.menProductURL);
  }
  setMensProduct(obj:any){
    return this.accessServer.post(this.menProductURL,obj);
  }
  getMencategory(){
    return this.accessServer.get(this.menCategory);
  }
  getwomensProduct(){
    return this.accessServer.get(this.womenProductURL);
  }
  setWomensProduct(obj:any){
    return this.accessServer.post(this.womenProductURL,obj);
  }
  getwomenscategory(){
    return this.accessServer.get(this.womenCategory);
  }
  getkidsProduct(){
    return this.accessServer.get(this.kidProductURL);
  }
  setKidsProduct(obj:any){
    return this.accessServer.post(this.kidProductURL,obj);
  }
  getkidsscategory(){
    return this.accessServer.get(this.kidCategory);
  }
  getRegisterDetails(){
    return this.accessServer.get(this.registerDetails);
  }
  postRegisterDetails(object:any){
    return this.accessServer.post(this.registerDetails,object);
  }
  getCartIds(){
    return this.accessServer.get(this.cartIds);
  }
  setCartIds(obj:any){
    return this.accessServer.post(this.cartIds,obj);
  }
  updateCartIds(obj:any){
    return this.accessServer.put(`${this.cartIds}/${obj.id}`,obj);
  }
  deleteCartProduct(userId:any){
    return this.accessServer.delete(`${this.cartIds}/${userId}`)
    // return this.accessServer.delete(`${this.cartIds}?userId=${userId}&productId=${productId}`)
  }
  // setKidGuard(){
  //   return this.kids;
  // }
}
