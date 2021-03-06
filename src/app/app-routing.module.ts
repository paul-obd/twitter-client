import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInAuthGuardService } from './guards/login-auth-guard';
import { PostTweetComponent } from './post-tweet/post-tweet.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ActivateUserEmailComponent } from './activate-user-email/activate-user-email.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate:[LogInAuthGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'add-tweet', component: PostTweetComponent, canActivate: [AuthGuardService]},
  {path: 'update-post/:id', component: UpdatePostComponent, canActivate: [AuthGuardService]},
  {path: 'signup', component: SignUpComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'account-verification/:token', component: ActivateUserEmailComponent},
  {path: 'reset-password/:id/:token', component: ResetPasswordComponent},
  
  {path: '', redirectTo: "/login", pathMatch: 'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
