import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  myToken:any=localStorage.getItem('setToken')
  constructor(private http:HttpClient) { }
  private readonly router=inject(Router)
    
  logOut():Observable<any>
  {
    return this.http.delete(`https://exam.elevateegy.com/api/v1/auth/logout`,
      {
        headers:
        {
          token:this.myToken
        }
      }
    )
  }



  
  



  
}
