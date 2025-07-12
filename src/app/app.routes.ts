import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register-component/register-component';
import { LoginComponent } from './auth/login-component/login-component';
import { ProfileComponent } from './auth/profile-component/profile-component';

export const routes: Routes = [
    {path:'register',component:RegisterComponent},
    {path:'',redirectTo:'register',pathMatch:'full'},

    {path:'login',component:LoginComponent},
    {path: 'profile',component:ProfileComponent},
    {path:'',redirectTo:'/login',pathMatch:'full'}
];
