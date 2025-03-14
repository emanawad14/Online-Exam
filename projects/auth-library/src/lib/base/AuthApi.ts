import { Observable } from 'rxjs';


export abstract class AuthApi{
    abstract login(data:any):Observable<any>
   abstract Register(data:any):Observable<any>
   abstract ForgetPassword(data:any):Observable<any>
   abstract RestCode(data:any):Observable<any>
   abstract RestPassword(data:any):Observable<any>

}