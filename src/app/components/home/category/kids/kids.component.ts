import { Component } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.css']
})
export class KidsComponent implements OnInit  {
  kidsProd:any[]=[];
  kidsCat:any[]=[];
  findCatInProd:any;
  prodCat:any[]=[];
  //====================
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
    this.displayKidsProducts();
  }
  displayKidsProducts(){
    this.service.getkidsProduct().subscribe((kidData:any)=>{
      this.kidsProd = kidData;
      this.service.getkidsscategory().subscribe((kidCat:any)=>{
        this.kidsCat = kidCat;
        this.kidsCat.forEach((catData:any)=>{
          this.findCatInProd = this.kidsProd.filter((obj:any)=> obj.prodCategory == catData.catId);
          this.findCatInProd.categoryName = catData.catName;
          this.prodCat.push(this.findCatInProd);
        })
      })
    })
  }

  addCart(id:any){
    if(this.parse == undefined || this.parse == null ){
      alert("You Need to Login to add the items in cart")
    }else{
      this.service.getkidsProduct().subscribe((Kidsdata:any)=>{
        this.storeCartDetails = Kidsdata.find((obj:any)=>obj.prodId == id)
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
