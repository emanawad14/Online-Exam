import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './shared/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ExamOnLine';

  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(() => {
      initFlowbite(); 
    });
  }
}
