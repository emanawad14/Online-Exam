import { Component, inject, OnInit } from '@angular/core';
import { HomeservicService } from '../../services/home/homeservic.service';
import { Isubject } from '../../interfaces/isubject';
import { Iexam } from '../../interfaces/iexam';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit{

  private readonly _homeservicService=inject(HomeservicService)

  subjects:Isubject[]=[]
  exams:Iexam[]=[]


  ngOnInit(): void {
    this.sendData()
    this.sendView()
    this.getAllSubject
      
  }

  sendData()
  {
   this._homeservicService.getAllSubject().subscribe(
    {
      next:(res)=>
      {
         console.log(res);
         this.subjects=res.subjects
         
      },
      error:(err)=>
      {
        console.log(err);
        

      }

    }
   )
  }

  //*******************  button View  *********************** */

  sendView()
  {
    this._homeservicService.getAllSubjectView().subscribe(
      {
        next:(res)=>
          {
             console.log(res);
             this.subjects=res.subjects
             
          },
          error:(err)=>
          {
            console.log(err);
            
    
          }
    
        
      }
    )

  }

  //*******************  getAllSubject  *********************** */

  getAllSubject(id:string)
  {
    this._homeservicService.getAllExamSubject(id).subscribe(
      {
        next:(res)=>
        {
           console.log(res);
           this.exams=res.exams
           
        },
        error:(err)=>
        {
          console.log(err);
          

        }
      }
    )
  }
}
