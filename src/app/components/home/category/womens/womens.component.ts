import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-womens',
  templateUrl: './womens.component.html',
  styleUrls: ['./womens.component.css']
})
export class WomensComponent implements OnInit {
  womensProd:any[]=[];
  womensCat:any[]=[];
  findCatInProd:any;
  prodCat:any[]=[];
  storeCartDetails:any;
  //====================
  getLocalstorageData:any = localStorage.getItem("UserDetails");
  parse:any = JSON.parse(this.getLocalstorageData);
  createLocalStorage:any[]=[];
  stringify:any;
  setLocalStorage:any;
  insertIds:any;
  //====================
   constructor(public service:CommonService,private router:Router){};
  ngOnInit(): void {
    this.displayWomensProduct();
  }
  displayWomensProduct(){
    this.service.getwomensProduct().subscribe((womenData:any)=>{
      this.womensProd = womenData;
      this.service.getwomenscategory().subscribe((womenCat:any)=>{
        this.womensCat = womenCat;
        this.womensCat.forEach((catData:any)=>{
          this.findCatInProd = this.womensProd.filter((obj:any)=>obj.prodCategory == catData.catId);
        this.findCatInProd.categoryName = catData.catName;
        this.prodCat.push(this.findCatInProd);
      })
        })
        
     });
  }
  
  addCart(id:any){
    if(this.parse == undefined || this.parse == null ){
      alert("You Need to Login to add the items in cart")
    }else{
      this.service.getwomensProduct().subscribe((data:any)=>{
        this.storeCartDetails = data.find((obj:any)=>obj.prodId == id)
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
      })
    }
  }
}
