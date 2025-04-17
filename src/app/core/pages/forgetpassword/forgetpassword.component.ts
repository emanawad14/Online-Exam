import { Component, inject } from '@angular/core';
import { NavComponent } from '../../component/nav/nav.component';
import { SocialComponent } from '../../component/social/social.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthLibraryService } from 'auth-library';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  imports: [NavComponent, SocialComponent, ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent {
  isSpinner: boolean = false;
  step: number = 1;


  
  private readonly _Router = inject(Router);

  //*********************** ForgetPassword  ***************************** */

  ForgetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  constructor(private _authLibraryService: AuthLibraryService) {}
  SumbitForget() {
    console.log(this.ForgetPassword.value);

    if (this.ForgetPassword.valid) {
      let EmailValue = this.ForgetPassword.get('email')?.value;
      this.PasswordRest.get('email')?.patchValue(EmailValue);
      this.isSpinner = true;
      this._authLibraryService
        .ForgetPassword(this.ForgetPassword.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.message === 'success') {
              this.step = 2;
            }
            this.isSpinner = false;
          },
          error: (err) => {
            console.log(err);
            this.isSpinner = false;
          },
        });
    }
  }


  resendCode()
  {
    this._authLibraryService
        .ForgetPassword(this.ForgetPassword.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.message === 'success') {
              this.step = 2;
            }
            this.isSpinner = false;
          },
          error: (err) => {
            console.log(err);
            this.isSpinner = false;
          },
        });
    }
  

  //*****************************   Rest Code **************************************** */

  RestCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  });

  SumbitRestCode() {
    console.log(this.RestCode.value);

    if (this.RestCode.valid) {
      this.isSpinner = true;
      this._authLibraryService.RestCode(this.RestCode.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status === 'Success') {
            this.step = 3;
          }

          this.isSpinner = false;
        },
        error: (err) => {
          console.log(err);
          this.isSpinner = false;
        },
      });
    }
  }

  //*****************************   RestPassword  **************************************** */

  PasswordRest: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required]),
  });

  SumbitPassword() {
    console.log(this.PasswordRest.value);
    if (this.PasswordRest.valid) {
      this.isSpinner = true;
      this._authLibraryService.RestPassword(this.PasswordRest.value).subscribe({
        next: (res) => {
          console.log(res);

          localStorage.setItem('setToken', res.token);
          
          if(res.message =='success')
          {
            this._Router.navigate(['/home']);
          }
          this.isSpinner = false;
        },
        error: (err) => {
          console.log(err);
          this.isSpinner = false;
        },
      });
    }
  }
}
