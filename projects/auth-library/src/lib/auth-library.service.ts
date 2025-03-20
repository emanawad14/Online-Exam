import { Injectable, inject } from '@angular/core';
import { AuthApi } from './base/AuthApi';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthEndPoint } from './enums/AuthApi.Endpoint';
import { AuthLibraryAdaptorService } from './adaptor/auth-library-adaptor.adaptor';
import { loginData } from './interfaces/loginData';
import { loginRes } from './interfaces/loginResponse';
import { registerData } from './interfaces/registerData';
import { registerRes } from './interfaces/registerResponse';
import { codeData, CodeRes } from './interfaces/code';
import { forgetDataEmail } from './interfaces/forgetemail';
import { forgetRes } from './interfaces/forgetRespo';
import { passwordData } from './interfaces/passwordData';
import { passwordRes } from './interfaces/passwordResp';







@Injectable({
  providedIn: 'root'
})
export class AuthLibraryService  implements AuthApi{

  constructor(private httpclient:HttpClient 
    ,
    private _AuthLibraryAdaptorService:AuthLibraryAdaptorService , 
      


  ) { }
  


 //************************* login ******************************** */

  login(data:loginData): Observable<loginRes> {
      return this.httpclient.post(AuthEndPoint.LOGIN,data).pipe(
        map((res:any)=>this._AuthLibraryAdaptorService.adapt(res)),
        catchError((error)=>of(error))
      )
  }
  //************************* Register ******************************** */

 Register(data:registerData):Observable<registerRes> {
  return this.httpclient.post(AuthEndPoint.REGISTER,data).pipe(
    map((res:any)=>this._AuthLibraryAdaptorService.adapt(res)),
    catchError((error)=>of(error))
  )
     
 }

 //***************************** ForgetPassword  ************************* */

  ForgetPassword(data: forgetDataEmail): Observable<forgetRes> {
    return this.httpclient.post(AuthEndPoint.FORGETPASSWORD,data).pipe(
      map((res:any)=>this._AuthLibraryAdaptorService.adaptForget(res)),
      
    )
     
 }
  //********************************* RestCode ************************************* */


  
   RestCode(data:codeData): Observable<CodeRes> {
    return this.httpclient.post(AuthEndPoint.RESTCODE,data).pipe(
      map((res:any)=>this._AuthLibraryAdaptorService.adaptCode(res)),
      catchError((error)=>of(error))
    )
      
  }


   //************************* RestPassword ******************************** */

    RestPassword(data: passwordData): Observable<passwordRes> {
       return this.httpclient.put(AuthEndPoint.RESTPASSWORD,data).pipe(
        map((res:any)=>this._AuthLibraryAdaptorService.adaptPassword(res)),
        catchError((error)=>of(error))
       )
   }
  
}
