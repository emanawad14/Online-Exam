import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../../shared/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-nav',
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

  private readonly _FlowbiteService=inject(FlowbiteService)

  ngOnInit(): void {
      this._FlowbiteService.loadFlowbite(() => {
        initFlowbite(); 
      });
    }
}
