import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavComponent } from "../../component/nav/nav.component";
import { SocialComponent } from "../../component/social/social.component";

@Component({
  selector: 'app-login',
  imports: [RouterLink, RouterLinkActive, NavComponent, SocialComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
