import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import { FormGroup,FormBuilder, Validators,ValidatorFn,AbstractControl,FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  newRegister:any;
  inputId:any[]=[];
  maxCatId:any;
  finalCatId:any;
  constructor(public service:CommonService, private router:Router,private formBuilder:FormBuilder){
    console.log('insert cat')
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username : ["",[Validators.required]],
      email : ["",[Validators.required,Validators.email]],
      password : ["",[Validators.required,Validators.minLength(8),this.passwordValidate()]],
      confirmPass : ['',[Validators.required]],
      selectRole : ['']
    },{
      validator : this.matchPassword()
    });
  }
  // ngOnChanges(): void {
  //   this.onsubmit();
  // }
  matchPassword(){
    return (control:AbstractControl):{[key:string]:any} | null =>{
      const password = control.get('password');
      const confirmPass = control.get('confirmPass');
      if(password && confirmPass && password.value !== confirmPass.value){
        return {'passwordMismatch':true};
      }
      return null;
    }
  }
  passwordValidate(){
    return (control:AbstractControl) : {[key:string]:any} | null =>{
      const password = control.value;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if(!passwordRegex.test(password)){
        return {'invalidPassword':true};
      }
      return null;
    }
  }
  onsubmit(){
    if(this.form.valid){
      this.service.getRegisterDetails().subscribe((data:any)=>{
        data.forEach((obj:any) => {
          this.inputId.push(obj.id)
        });
        this.maxCatId = Math.max(...this.inputId);
        if(this.maxCatId == null || this.maxCatId == undefined || this.maxCatId == '' || this.maxCatId == -Infinity){
          this.maxCatId = 2000;
        }
        this.finalCatId = this.maxCatId + 1;
        console.log(this.finalCatId)
        var userName = this.form.get('username')?.value;
        var email = this.form.get('email')?.value;
        var password = this.form.get('password')?.value;
        var confirmPass = this.form.get('confirmPass')?.value;
        var selectRole = this.form.get('selectRole')?.value;
        this.newRegister = {id:this.finalCatId,role:selectRole,name:userName, email:email, password:password}
          if(userName === '' || email ==='' || password === '' || confirmPass === '' || selectRole===''){
            alert("Input Must Not be empty")
          }else{
            this.service.postRegisterDetails(this.newRegister).subscribe(()=>{
              alert('category is inserted')
              this.router.navigate(['/login']);
            })
          }
      })
    }else{
      alert("Fill-up Necessary Details");
    }
  }
}
