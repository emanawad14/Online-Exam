import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeservicService {


  
  myToken:any=localStorage.getItem('setToken')

  constructor( private httpclient:HttpClient) { }


  //************************  getAllSubject ************************ */

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

  //**************************  getAllSubjectView ***************************** */



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

  //**************************  getAllExamSubject***************************** */

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

  //**************************  getAllQuestionExam ***************************** */

  getAllQuestionExam():Observable<any>
  {
    return this.httpclient.get(`https://exam.elevateegy.com/api/v1/questions?exam=670070a830a3c3c1944a9c63`,
      {
        headers:{
          token:this.myToken
        }
      }
    )
  }
  
}
