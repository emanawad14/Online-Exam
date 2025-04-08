import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-quiz',
  imports: [ RouterLink , RouterLinkActive , NgClass],
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
