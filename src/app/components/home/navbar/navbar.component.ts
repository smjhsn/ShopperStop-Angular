import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { MensComponent } from '../category/mens/mens.component';
import { concat } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
searchBox:string='';
testForEach:any;
//=============Array Concat===============
mensProduct:any[]=[];
womensProduct:any[]=[];
kidsProduct:any[]=[];
allProductsArray:any;
//========================================
getLocalStorage:any = localStorage.getItem("UserDetails");
parse:any = JSON.parse(this.getLocalStorage);
displayUserName:any;
LogoutOrLogin:any;
adminOrNot:boolean=false;
adminOrNotCart:boolean=true;
//========================================
// @Output() searchButtonClicked: EventEmitter<void> = new EventEmitter<void>();
constructor(private service:CommonService,private route:Router){};

ngOnInit(): void {
  this.displaySearchItems();
  this.displayNavbarName();
  this.admin();
}
admin(){
  if(this.parse.role === "admin"){
    this.adminOrNot = true;
    this.adminOrNotCart = false;
  }else{
    this.adminOrNot = false;
    this.adminOrNotCart = true;
  }
}
displayNavbarName(){
  if(this.getLocalStorage == null || this.getLocalStorage == undefined || this.getLocalStorage == ""){
    this.displayUserName = "Guest"
    this.LogoutOrLogin = "Login"
  }else{
    this.displayUserName = this.parse.name;
    this.LogoutOrLogin = "Logout"
  }
}

displaySearchItems(){//here getting all category products and insert them into a single array for all products to display during global search 
  this.service.getMensProduct().subscribe((menData:any)=>{
    this.mensProduct = menData;
    // console.log("mens",this.mensProduct);
    this.service.getwomensProduct().subscribe((womenData:any)=>{
      this.womensProduct = womenData;
      // console.log("women",this.womensProduct);
      this.service.getkidsProduct().subscribe((kidData:any)=>{
        this.kidsProduct = kidData;
        // console.log("kids",this.kidsProduct);
        this.allProductsArray = [...this.mensProduct, ...this.womensProduct, ...this.kidsProduct];//merging all arrays into single array
        // console.log("final",this.allProductsArray);
      })
    })
  })
}
onClick(){
  if(this.searchBox == "" || this.searchBox == null || this.searchBox == undefined){
    alert("Search Should Not be Empty");
    // this.service.searchButtonclicked.next(false);
    // this.service.searchButtonclicked = false;
  }else{
    // this.service.searchButtonclicked.next(true);
    // this.service.searchButtonclicked = true;
      var productsArray:any[]=[];
      var loop = this.allProductsArray.forEach((obj:any)=>{//looping through the array which now contains all the array of products data
        var name = obj.prodName.toLowerCase();//convert text to lowercase for so that we can obtain results even if we enter the capital letter texts
        var input = this.searchBox.toLowerCase();//lowerCasing the sesrch box text
        var output = name.includes(input);//The includes() method returns a boolean value (true or false) based on whether the substring is found within the string or not.
        if(output == true){
          productsArray.push(obj);
        }
      })
      // console.log("first",productsArray);
      this.service.searchBarValue = productsArray;
      // console.log("second",this.service.searchBarValue);
      this.searchBox = '';
      this.route.navigate(["home/search-products"]);
      
  }
}
onLogOut(){
  localStorage.removeItem("UserDetails");
}
}
