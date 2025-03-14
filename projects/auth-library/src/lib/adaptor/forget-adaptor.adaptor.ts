import { Injectable } from '@angular/core';
import { adaptForget } from '../interfaces/adaptForget';

@Injectable({
  providedIn: 'root'
})
export class ForgetAdaptorService implements adaptForget {

  constructor() { }
  
  

  adaptForget(data:any): any {
      return {
        message: data.message,
        code: data.code,
        
      };
    }
}
