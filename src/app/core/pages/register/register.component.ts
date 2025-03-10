import { Component } from '@angular/core';
import { NavComponent } from "../../component/nav/nav.component";
import { SocialComponent } from "../../component/social/social.component";

@Component({
  selector: 'app-register',
  imports: [NavComponent, SocialComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}
