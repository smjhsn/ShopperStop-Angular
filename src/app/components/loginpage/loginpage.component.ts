import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthguardService } from 'src/app/service/authguard.service';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent {
  userName:any;
  password:any;
  userdata:any;
  // stringify:any;
  // localStorage:any;
  constructor(private router:Router,private service:CommonService,private authservice:AuthguardService){};
  onlogin(){
    // this.router.navigate(['/home'])
    this.service.getRegisterDetails().subscribe((data:any)=>{
      this.userdata = data.find((obj:any)=>obj.name == this.userName && obj.password == this.password)
      // console.log(this.userdata);
      if(this.userdata){
        if(this.userdata.name == this.userName && this.userdata.password == this.password){
          var stringify = JSON.stringify(this.userdata)
          var setUserDetailsToLs = localStorage.setItem("UserDetails",stringify);
          this.router.navigate(["/home"]);
        }else{
          alert("wrong username or password")
        }
      }else{
        alert("Register First")
      }
    })
  }
}
