import { Injectable } from '@angular/core';
import { Adaptor } from '../interfaces/adaptor';
import { loginApiData, loginRes } from '../interfaces/loginResponse';
import { adaptForget } from '../interfaces/adaptForget';
import { adaptCode } from '../interfaces/adaptcode';
import { Adaptorpass } from '../interfaces/adaptpassword';
import {  CodeRes } from '../interfaces/code';
import { forgetData, forgetRes } from '../interfaces/forgetRespo';
import { codeId } from '../interfaces/codeData';
import { passwordApiData, passwordRes } from '../interfaces/passwordResp';

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


  adaptForget(data:forgetData): forgetRes {
    return {
      message: data.message,
      info: data.info,
      
    };
  }




  
  adaptCode(data:codeId):CodeRes
  {
    console.log(data);
    
    return{
      status:data.status
     
      
    }
   
  }








  

  adaptPassword(data:passwordApiData):passwordRes
  {
    return{
      message:data.message,
      token:data.token
    }
  }


}
