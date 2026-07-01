import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';



@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  userLoginForm= this.fb.group({
    username:['',[Validators.required]],
    password:['',[Validators.required]]
  })


  constructor(private fb:FormBuilder, private userAuthService:UserAuthService, private router:Router) { }

  ngOnInit(): void {
  }

  userLoginSubmit():void{
    console.log("submit button clicked");
 
 if(this.userLoginForm.valid){
  const {username,password} = this.userLoginForm.value;
  this.userAuthService.getUserLoginDetails(username,password).subscribe({
    next:(response)=>{
      console.log("user login successful",response);
      this.router.navigate(['/display/dashboard']);
    },
    error:(error)=>{
      console.log("user login failed",error);
    }
  })
 }
  }
}
