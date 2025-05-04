import { NgClass, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ListboxModule } from 'primeng/listbox';


interface Question {
  question: string;
  options: string[];
  answer: number;
  selected?: number| null;
}

@Component({
  selector: 'app-quiz',
  imports: [ RouterLink , RouterLinkActive , NgClass ,NgIf ,ListboxModule ] ,
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {

  sidebarOpen: boolean = false;
  sidebarclose: boolean = true;

  
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  
  }


  
  
  
  
}
