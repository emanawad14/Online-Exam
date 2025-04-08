import { Component, inject } from '@angular/core';
import { NavComponent } from "../../component/nav/nav.component";
import { SocialComponent } from "../../component/social/social.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

import { AuthLibraryService } from 'auth-library';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,NavComponent, SocialComponent , RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isLoading:boolean=false;
  MsgError:string='';
  MsgSuccess:string='';
  RegisterForm:FormGroup=new FormGroup(
    {
      username:new FormControl(null , [Validators.required ]),
      firstName:new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
      lastName:new FormControl(null , [Validators.required ,Validators.minLength(3) , Validators.maxLength(20)]),
      email:new FormControl(null , [Validators.required , Validators.email]),
      password:new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
      rePassword:new FormControl(null , [Validators.required]),
      phone:new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
    }
  )

  constructor(private _authLibraryService:AuthLibraryService){}
  private readonly router=inject(Router);
  private readonly _ToastrService=inject(ToastrService);


  SumbitRegister()
  {
   
    if(this.RegisterForm.valid)
    {
      console.log(this.RegisterForm.value);
      this.isLoading=true;
      this._authLibraryService.Register(this.RegisterForm.value).subscribe(
        {
          next:(res)=>
            {
             console.log(res);
             if(res.message ==='success')
             {
                 this.MsgSuccess=res.message

                
                 setTimeout(() => {
                  this.router.navigate(['/login']);
                  this._ToastrService.show(res.message , ' Please complete the login')
                  
                 }, 2000);
             }
                this.isLoading=false;
            },
            error:(err)=>
            {
              console.log(err);
              this.isLoading=false;
              this.MsgError=err.error
              
              
            }
        }
      )
      
    }
  }

}
//""username" must be a string,"firstName" must be a string,"lastName" with value "Animi debitis simil" fails to match the required pattern: /^[a-zA-Z]+$/,"password" with value "Repellendus Aperiam" fails to match the required pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"phone" with value "+1 (273) 851-7921" fails to match the required pattern: /^01[0125][0-9]{8}$/"