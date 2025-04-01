import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeservicService {
  myToken:any=localStorage.getItem('setToken')

  constructor( private httpclient:HttpClient) { }

  getAllSubject():Observable<any>

  {
    return this.httpclient.get(`https://exam.elevateegy.com/api/v1/subjects?limit=6` ,
      {
        headers:
        {
         token:this.myToken

        }
      }
    )
    
  }



  getAllSubjectView():Observable<any>

  {
    return this.httpclient.get(`https://exam.elevateegy.com/api/v1/subjects` ,
      {
        headers:
        {
         token:this.myToken

        }
      }
    )
    
  }


  getAllExamSubject(id:string):Observable<any>
  {
    return this.httpclient.get(`https://exam.elevateegy.com/api/v1/exams?subject=${id}` ,
      {
        headers:
        {
          token:this.myToken
        }
      }
    )
    
  }
  
}
