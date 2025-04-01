import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';

export const routes: Routes =
[
    
    {path:'' , component:AuthLayoutComponent , title:'Auth' ,
        children:
        [
            {path:'login' , loadComponent:()=>import('./core/pages/login/login.component').then((c)=>c.LoginComponent), title:'Login'},
            {path:'register' , loadComponent:()=>import('./core/pages/register/register.component').then((c)=>c.RegisterComponent), title:'Register'},
            {path:'forgetPassword' , loadComponent:()=>import('./core/pages/forgetpassword/forgetpassword.component').then((c)=>c.ForgetpasswordComponent), title:'ForgetPassword'},

        ]
    },

    {path:'home' , loadComponent:()=>import('./Features/pages/home/home.component').then((c)=>c.HomeComponent),title:'Home'},

];
