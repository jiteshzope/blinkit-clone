import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';

const userAuthRoutes: Routes = [
  // Define your user authentication routes here
  {path: 'login', component: UserLoginComponent},
  {path: 'register', component: UserRegisterComponent},
];

@NgModule({
  declarations: [
    UserLoginComponent,
    UserRegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(userAuthRoutes)
  ]
})
export class UserAuthModule { }
