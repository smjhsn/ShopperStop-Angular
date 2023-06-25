import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { FormGroup,FormBuilder,AbstractControl,Validator,ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-product-insert',
  templateUrl: './admin-product-insert.component.html',
  styleUrls: ['./admin-product-insert.component.css']
})
export class AdminProductInsertComponent implements OnInit {
  form!:FormGroup;
  //========================
  mens:boolean=false;
  womens:boolean=false;
  kids:boolean=false;
  //========================
  insertObject:any;
  //========================
  mergeAllProducts:any[]=[];
  menData:any;
  womenData:any;
  kidData:any;
  menMaxProdId:any;
  womenMaxProdId:any;
  kidMaxProdId:any;
  //========================
  constructor(public service:CommonService,public builder:FormBuilder){}
  ngOnInit(): void {
    this.form = this.builder.group({
      productName : ['',[Validators.required]],
      productImage : ['',[Validators.required]],
      productPrice : ['',[Validators.required]],
      productDiscount : ['',[Validators.required]],
      category:['',[Validators.required]],
      menCat:['',[Validators.required]],
      womenCat:['',[Validators.required]],
      kidCat:['',[Validators.required]]
    })
  }

 //===============seletcing the category to display specific category===================
  selectCat(){
    if(this.form.get('category')?.value === "men"){
      this.mens = true;
      this.womens = false;
      this.kids = false;
    }else if(this.form.get('category')?.value === "women"){
      this.mens = false;
      this.womens = true;
      this.kids = false;
    }else if(this.form.get('category')?.value === "kid"){
      this.mens = false;
      this.womens = false;
      this.kids = true;
    }
  }
 //======================================================================
  addProducts(){
      var productPrice = this.form.get('productPrice')?.value
      var priceAsNumber = parseInt(productPrice);
      var productDiscount = this.form.get('productDiscount')?.value
      var discountAsNumber = parseInt(productDiscount);
      var productName = this.form.get('productName')?.value;
      var productImage =this.form.get('productImage')?.value
      var category = this.form.get('category')?.value;
      var menCategory =this.form.get('menCat')?.value;
      var womenCategory = this.form.get('womenCat')?.value;
      var kidcategory = this.form.get('kidCat')?.value;
    if(productName === "" || productImage==="" || category === "" || productPrice === "" || productDiscount ==="" ){
      alert("Product Details Should not be Empty")
    }else{
      if(category === "men"){
        var catgeoryAsNumber = parseInt(menCategory);
        this.service.getMensProduct().subscribe((mendata:any)=>{
          this.menData = mendata;
          this.menData.forEach((data:any)=>{
            this.menMaxProdId = 0;
            if(data.prodId > this.menMaxProdId){
              this.menMaxProdId = data.prodId;
            }
          });
          var increaseProdId = this.menMaxProdId + 1;
          this.insertObject = {
            prodId : increaseProdId,
            prodName : productName,
            prodImage : productImage,
            prodCategory : catgeoryAsNumber,
            prodPrice : priceAsNumber,
            prodDiscount : discountAsNumber
          }
          this.insertProductAccordingly();
          this.form.reset();//reset() is the default keyword to reset the filed of input which was declared inside the form:formGroup
        })
        
      }else if(category === "women"){
        var catgeoryAsNumber = parseInt(womenCategory);
        this.service.getwomensProduct().subscribe((womendata:any)=>{
          this.womenData = womendata;
          this.womenData.forEach((data:any)=>{
            this.womenMaxProdId = 0;
            if(data.prodId > this.womenMaxProdId){
              this.womenMaxProdId = data.prodId;
            }
          });
          var increaseProdId = this.womenMaxProdId + 1;
          this.insertObject = {
            prodId : increaseProdId,
            prodName : productName,
            prodImage : productImage,
            prodCategory : catgeoryAsNumber,
            prodPrice : priceAsNumber,
            prodDiscount : discountAsNumber
          }
          this.insertProductAccordingly();
          this.form.reset();//reset() is the default keyword to reset the filed of input which was declared inside the form:formGroup
        })
        
      }else if(category === "kid"){
        var catgeoryAsNumber = parseInt(kidcategory);
        this.service.getkidsProduct().subscribe((kiddata:any)=>{
          this.kidData = kiddata;
          this.kidData.forEach((data:any)=>{
            this.kidMaxProdId = 0;
            if(data.prodId > this.kidMaxProdId){
              this.kidMaxProdId = data.prodId;
            }
          });
          var increaseProdId = this.kidMaxProdId + 1;
          this.insertObject = {
            prodId : increaseProdId,
            prodName : productName,
            prodImage : productImage,
            prodCategory : catgeoryAsNumber,
            prodPrice : priceAsNumber,
            prodDiscount : discountAsNumber
          }
          this.insertProductAccordingly();
          this.form.reset();//reset() is the default keyword to reset the filed of input which was declared inside the form:formGroup
        })
      }
    }
  }

    
  //==============Inserting the product Depends upton the category they Are==========================
  insertProductAccordingly(){
    if(this.form.get('category')?.value === "men"){
      this.service.setMensProduct(this.insertObject).subscribe((data)=>{
        alert("Product Inserted Successfully")
      })
    }else if(this.form.get('category')?.value === "women"){
      this.service.setWomensProduct(this.insertObject).subscribe((data)=>{
        alert("Product Inserted Successfully")
      })
    }else if(this.form.get('category')?.value === "kid"){
      this.service.setKidsProduct(this.insertObject).subscribe((data)=>{
        alert("Product Inserted Successfully")
      })
    }
  }
  //==============================================================================
}
