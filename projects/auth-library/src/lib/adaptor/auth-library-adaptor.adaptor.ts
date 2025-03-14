import { Injectable } from '@angular/core';
import { Adaptor } from '../interfaces/adaptor';
import { loginApiData, loginRes } from '../interfaces/loginResponse';
import { adaptForget } from '../interfaces/adaptForget';
import { adaptCode } from '../interfaces/adaptcode';
import { Adaptorpass } from '../interfaces/adaptpassword';
import { codeData, CodeRes } from '../interfaces/code';

@Injectable({
  providedIn: 'root'
})
export class AuthLibraryAdaptorService implements Adaptor ,adaptForget , adaptCode ,Adaptorpass {

  constructor() { }

  adapt(data:loginApiData): loginRes {
    return {
      message: data.message,
      token: data.token,
      userEmail: data.user.email,
    };
  }

  adaptForget(data:any): any {
    return {
      message: data.message,
      info: data.info,
      
    };


  }


  
  adaptCode(data:codeData):CodeRes
  {
    return{
      status:data.resetCode
      
      
    }
   
  }








  

  adaptPassword(data:any):any
  {
    return{
      message:data.message,
      token:data.token
    }
  }


}
