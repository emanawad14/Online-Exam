import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild, viewChild } from '@angular/core';
import { HomeservicService } from '../../services/home/homeservic.service';
import { Isubject } from '../../interfaces/isubject';
import { Iexam } from '../../interfaces/iexam';
import { Modal } from 'flowbite';

import { IQuestions } from '../../interfaces/i-questions';
import { LogoutService } from '../../services/logout/logout.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchPipe } from '../../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgForOf, NgIf, SlicePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  imports: [SearchPipe , FormsModule , NgClass , NgFor , NgForOf , NgIf , RouterLink , RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'

})
export class HomeComponent  implements OnInit , AfterViewInit  , OnDestroy{

  

  
  
  

  private readonly _homeservicService=inject(HomeservicService);
  private readonly _LogoutService=inject(LogoutService);
  private readonly _Router=inject(Router);
  private readonly _ToastrService=inject(ToastrService);

  homeSubscribtion:Subscription=new(Subscription)



  text:string=''
  step:number=1
  questiontype:number=2
  currentQuestionIndex: number = 0;
  sidebarOpen: boolean = false;




 subjects:Isubject[]=[]
 exams:Iexam[]=[]
 questions:IQuestions[]=[]




  ngOnInit(): void {
    this.sendData()
   

  }


  @ViewChild('items') items:ElementRef=new ElementRef('')
  
   options:any = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses:
        'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
        console.log('modal is hidden');
    },
    onShow: () => {
        console.log('modal is shown');
    },
    onToggle: () => {
        console.log('modal has been toggled');
    },
};

 instanceOptions = {
  id: 'static-modal',
  override: true
};

openModel(index:number)
{

  let ele=this.items.nativeElement as HTMLElement
  const modal = new Modal(ele, this.options, this.instanceOptions);
  modal.show()
}

//************************************************** */


  ngAfterViewInit(): void {
    console.log(this.items);
    
    
  }



 
  

  
  //******************** SendData *************************** */
  sendData()
  {
   this.homeSubscribtion=this._homeservicService.getAllSubject().subscribe(
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

  //*******************  button View  AllLimit *********************** */

  sendView()
  {
    this._homeservicService.getAllSubjectView().subscribe(
      {
        next:(res)=>
          {
             console.log(res);
             this.subjects=res.subjects
             this._ToastrService.success("Show Data")
            
             
             
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
           if (res.message === 'success') {
            this.step=2
            this._ToastrService.info("Show the choice Quiz")
            
           }
           
        },
        error:(err)=>
        {
          console.log(err);
          

        }
      }
    )
  }




  //**************************  getAllQuestionExam ***************************** */

  getQuestions()
  {
    this._homeservicService.getAllQuestionExam().subscribe(
      {
        next:(res)=>{
          console.log(res);
         
          this.questions=res.questions 
          if(res.message =='success')
          {
            this.questiontype =3
            this._ToastrService.success("Prepare for the Quiz")
          }
          

          
        },
        error:(err)=>
        {
          console.log(err);
          
        }
      }
    )
  }


  
  









  //************************** logOut  ******************************* */

  logOut()
  {
    localStorage.removeItem('setToken');
    this._LogoutService.logOut().subscribe(
      {
        next:(res)=>
        {
          console.log(res);
         
        },
        error:(err)=>
        {
          console.log(err);
         
          
          
        }
      }
    )

    this._Router.navigate(['/login']);
    this._ToastrService.error("Please log in again.")
          
  }


  // ****************************************

  
  


  ngOnDestroy(): void {
      this.homeSubscribtion.unsubscribe()
  }









  




 
  
nextQuestion() {
  if (this.currentQuestionIndex < this.questions.length - 1) {
    this.currentQuestionIndex++;
    
    console.log(`Current Question Index after update: ${this.currentQuestionIndex}`);
    console.log(`Current Question: ${this.questions[this.currentQuestionIndex].question}`);
  }
}

previousQuestion() {
  if (this.currentQuestionIndex > 0) { 
    this.currentQuestionIndex--;
    
    console.log(`Current Question Index after update: ${this.currentQuestionIndex}`);
    console.log(`Current Question: ${this.questions[this.currentQuestionIndex].question}`);
  }
}





toggleSidebar() {
  this.sidebarOpen = !this.sidebarOpen;
}


}






