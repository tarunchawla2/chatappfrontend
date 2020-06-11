import { NgModule } from "@angular/core";
import { RouterModule, Routes, Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AuthGuard } from './auth/auth.guard';
import { ChatroomComponent } from './chatroom/chatroom.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'chat', canActivate: [AuthGuard], component: UsersListComponent, children: [
      { path: 'chatroom', component: ChatroomComponent },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
