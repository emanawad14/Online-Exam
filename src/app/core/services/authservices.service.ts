import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AuthState } from '../../store/auth.reducer';
import { setToken } from '../../store/auth.actions';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthservicesService {

  userData:any=null
  token$:Observable<string|null>

  constructor(private store:Store<{Auth:AuthState}>) { 
  this.token$=this.store.select('Auth').pipe(map((state)=>state.token))
  }


  saveToken(token: string) {
    this.store.dispatch(setToken({ token }));
  }


  saveTokenData():void
  {
    
    if(localStorage.getItem('setToken')!==null)
    {
     this.userData= jwtDecode(localStorage.getItem('setToken')!)

     console.log( 'userData',this.userData );
     
    }
  }

  


}
