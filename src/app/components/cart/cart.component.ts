import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  searchBox:any;
  finalPrice:any;
  totalPrice:any;
  ngOnInit(): void {
    this.display();
    
  }
  
 
  getUserLocalStorageDetails:any = localStorage.getItem("UserDetails");
  userParse:any = JSON.parse(this.getUserLocalStorageDetails);
  username:any = this.userParse?.name;
  //=========================================
  userId:any=this.userParse?.id;
  prodCat:any[]=[];
  //==================="""CONSTRUCTOR""=====================
  constructor(public service:CommonService,private route:Router){};
  //==================="""CONSTRUCTOR""=====================
  
  display() {
        this.service.getCartIds().subscribe((cartIds:any)=>{
          // console.log("cartsids",cartIds)
          const filter = cartIds.filter((obj:any)=>obj.userId == this.userParse.id);
          // var ff = filter.find((obj:any)=>obj.userId == )
          const find = filter.forEach((obj:any)=>{
            // console.log("filter",obj.productDiscount);
            // var objQuantity = parseInt(obj.productQuantity)//converting string into number
            obj.finalPrice = obj.productDiscount * obj.productQuantity;
          this.prodCat.push(obj);
          // console.log("final",this.prodCat);
          this.calculateTotalPrice();
          })
         })  
  }
  updateFinalPrice(f:any){
    var selectedQuantity = parseInt(f.productQuantity);//converting string into number
    f.productQuantity = selectedQuantity;//then store that number value in productquantity so that it willbe updated as number in json server
    f.finalPrice = f.productDiscount * selectedQuantity;
    this.service.updateCartIds(f).subscribe((data:any)=>{//passing the cart details and update the updated details using its id in common service file
      alert("Updated")
    });
    this.calculateTotalPrice();
  }
  calculateTotalPrice(){
    let totalPrice = 0;
    this.prodCat.forEach((f:any)=>{
      totalPrice += f.finalPrice;
    })
    this.totalPrice = totalPrice;
  }
    deleteData(userId:any){
      this.service.deleteCartProduct(userId).subscribe((data:any)=>{
        alert("Item Deleted");
        this.prodCat = [];
        this.display();
        this.calculateTotalPrice();
      })
    }
    onCheckOut(){
      this.route.navigate(["home/payment"]);
    }
    refreshCart(){

    }
  
}
