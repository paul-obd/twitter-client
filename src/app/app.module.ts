import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostTweetComponent } from './post-tweet/post-tweet.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TweetService } from './services/tweet.service';
import { UpdatePostComponent } from './update-post/update-post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

import { MaterialModule } from './material/material.module';  
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { LogInAuthGuardService } from './guards/login-auth-guard';
import { ToolbarService } from './services/toolbar.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    PostTweetComponent,
    UpdatePostComponent,
    LoginComponent,
    SignUpComponent,
    PostsComponent,
    PostComponent,
    ProfileComponent,
    HomeComponent,
    ToolbarComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [TweetService, AuthService, AuthGuardService,LogInAuthGuardService, ToolbarService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
