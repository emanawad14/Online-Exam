import { AfterViewInit, Component, ElementRef, inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { animate, state, style, transition, trigger } from '@angular/animations';

import { ChartModule } from 'primeng/chart';





@Component({
  selector: 'app-home',
  imports: [SearchPipe , FormsModule , NgClass , NgFor , NgForOf , NgIf , RouterLink , RouterLinkActive , ChartModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations:
  [
    trigger('quizes' ,[
        state('normal',style({
          color:"#4461F2",
          transform:"translatey(0px)"
        })),
        state('hilighted',style({
          backgroundColor:"#4461F2",
          color:'white',
          borderRadius:'4px',
          transform:"translatey(-30px) scale(.5) ",
          padding:"4px",
          //transform:"rotate(180deg) scale(.5)"
        })),
        transition("normal => hilighted" , animate(300)),
        transition("hilighted => normal" ,animate(800)
         
        
        ),

      ])
    
  ]

})
export class HomeComponent  implements OnInit , AfterViewInit  , OnDestroy{
 
  
  
  state='normal'

  changeData(){
    this.state=this.state=='normal'?'hilighted':'normal'
  }
  
  
  

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
  selectedAnswerIndex: number | null = null;

  selectedAnswerss: string[] = [];

  score: number = 0;
  isQuizFinished: boolean = false;
  
  incorrectQuestions: any[] = [];

  selectedAnswers: { [key: string]: string } = {};
  showResult = false;
  correctAnswersCount = 0;
  wrongAnswers: IQuestions[] = [];
  
  chartData: any;
  chartOptions: any;


  remainingTime: number = 600; 
  timerInterval: any;


  correctAnswers = 0;
  incorrectAnswers = 0;
  scorePercentage = 0;



 subjects:Isubject[]=[]
 exams:Iexam[]=[]
 questions:IQuestions[]=[]




  ngOnInit(): void {
    this.sendData();
   
    this.startTimer();
    
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




toggleSidebar() {
  this.sidebarOpen = !this.sidebarOpen;
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

// ***************** Select Answer  ***************************


selectOption(index:number)
{
  this.selectedAnswerIndex=index
}


selectAnswerr(answerKey:string)
{
  this.selectedAnswers[this.currentQuestionIndex]=answerKey
}

//*************************************************************** */


 



  selectAnswer(answerKey: string) {
    this.selectedAnswers[this.questions[this.currentQuestionIndex]._id] = answerKey;
  }

 
  chosenAnswers: { [key: number]: string } = {}; 
  
chooseAnswer(answerKey: string) {
  this.chosenAnswers[this.currentQuestionIndex] = answerKey;
}

 
  

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex ++;
      if(this.currentQuestionIndex===this.questions.length-1)
            {
              this.questiontype=4
             }
    }
     
    
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

// **********************************************************
finishQuiz() {
  this.correctAnswers = 0;
  this.incorrectAnswers = 0;
  this.questions.forEach((question, index) => {
    const selected = this.chosenAnswers[index];
    const correct = question.correct;
    
    if (selected === correct) {
      this.correctAnswers++;
    } else {
      this.incorrectAnswers++;
    }
  });

  this.chartData = {
    labels: ['Correct', 'Incorrect'],
    datasets: [
      {
        data: [this.correctAnswers, this.incorrectAnswers],
        backgroundColor: ['#11CE19', '#F44336']
      }
    ]
  };

  this.isQuizFinished = true;
}









showResults()
{
  this.questiontype=5
}





startTimer() {
  this.timerInterval = setInterval(() => {
    if (this.remainingTime > 0) {
      this.remainingTime--;
    } else {
      this.finishQuiz();
    }
  }, 1000);
}

formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 25 ? '0' : ''}${secs}`;
}



calculateResults() {
  this.wrongAnswers = [];

  this.questions.forEach((question, index) => {
    const selected = this.chosenAnswers[index]; 
    
    if (selected !== question.correct) {
      this.wrongAnswers.push({
        ...question,
      
        correct: question.correct,
        _id: index 
      });
    }
  });
}






ngOnDestroy(): void {
  this.homeSubscribtion.unsubscribe()
}




}






