import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-globalsearchproducts',
  templateUrl: './globalsearchproducts.component.html',
  styleUrls: ['./globalsearchproducts.component.css']
})
export class GlobalsearchproductsComponent {
  //=====================
  storeCartDetails:any;
  insertIds:any;
  getLocalstorageData:any = localStorage.getItem("UserDetails");
  parse:any = JSON.parse(this.getLocalstorageData);
  //=====================
  constructor(public service:CommonService,private router:Router){};
  addCart(id:any){
    if(this.parse == undefined || this.parse == null ){
      alert("You Need to Login to add the items in cart")
    }else{
      this.storeCartDetails = this.service.searchBarValue.find((obj:any)=>obj.prodId == id)
      this.service.getCartIds().subscribe((data:any)=>{
        var storeCartIts = data.find((obj:any)=>obj.productId == id && obj.userId == this.parse.id);
        if(storeCartIts === null || storeCartIts === undefined){
          const productId = this.storeCartDetails.prodId;
        const categoryId = this.storeCartDetails.prodCategory;
        const userId = this.parse.id;
        this.insertIds = {
          productId : productId,
          categoryId : categoryId,
          userId : userId,
          productImage : this.storeCartDetails.prodImage,
          productName : this.storeCartDetails.prodName,
          productPrice : this.storeCartDetails.prodPrice,
          productDiscount : this.storeCartDetails.prodDiscount,
          productQuantity : 1
        }
        this.service.setCartIds(this.insertIds).subscribe();
        alert("Item is Inserted");
        this.router.navigate(["/cart"]);
        }else{
          console.log(storeCartIts.productQuantity+=1);
          storeCartIts.productQuantity +1;
          this.service.updateCartIds(storeCartIts).subscribe();
          alert("Item is Inserted");
          this.router.navigate(["/cart"]);
        }
      })
    }
  }
}


        
