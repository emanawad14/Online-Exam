import { Component } from '@angular/core';
import { NavComponent } from "../../component/nav/nav.component";
import { SocialComponent } from "../../component/social/social.component";

@Component({
  selector: 'app-forgetpassword',
  imports: [NavComponent, SocialComponent],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {

}
