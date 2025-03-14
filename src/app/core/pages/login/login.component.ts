import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavComponent } from "../../component/nav/nav.component";
import { SocialComponent } from "../../component/social/social.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthLibraryService } from 'auth-library';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule  ,RouterLink, RouterLinkActive, NavComponent, SocialComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isLoading:boolean=false;
 MsgError:string='';
  MsgSuccess:string='';
  FormLogin:FormGroup=new FormGroup(
    {
      email:new FormControl(null , [Validators.required , Validators.email]),
      password:new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    }
  )
  constructor(private _authLibraryService:AuthLibraryService){}


  loginSumbit()
  {
    
    if(this.FormLogin.valid)
    {
      console.log(this.FormLogin.value);
      this.isLoading=true
    this._authLibraryService.login(this.FormLogin.value).subscribe({
      next:(res)=>
      {
        console.log(res);
        if(res.message ==='success')
        {
          this.MsgSuccess=res.message
        }
        this.isLoading=false

      }
      ,
      error:(err)=>
      {

        console.log(err);
        this.isLoading=false;
        this.MsgError=err.error.message;
        
        
      }
    })
    
    }
  }

}
