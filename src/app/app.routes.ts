import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';

export const routes: Routes =
[
    
    {path:'' , component:AuthLayoutComponent, canActivate:[logedGuard] , title:'Auth' ,
        children:
        [
            {path:'', redirectTo:'login',pathMatch:'full'},
            {path:'login' , loadComponent:()=>import('./core/pages/login/login.component').then((c)=>c.LoginComponent), title:'Login'},
            {path:'register' , loadComponent:()=>import('./core/pages/register/register.component').then((c)=>c.RegisterComponent), title:'Register'},
            {path:'forgetPassword' , loadComponent:()=>import('./core/pages/forgetpassword/forgetpassword.component').then((c)=>c.ForgetpasswordComponent), title:'ForgetPassword'},

        ]
    },

    {path:'home' , loadComponent:()=>import('./Features/pages/home/home.component').then((c)=>c.HomeComponent),title:'Home'
        , canActivate:[authGuard]
    },
    {path:'quiz' , loadComponent:()=>import('./Features/pages/quiz/quiz.component').then((c)=>c.QuizComponent),title:'quiz'
        , canActivate:[authGuard]
    },

];
