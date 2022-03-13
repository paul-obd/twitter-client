import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ForgotPasswordService } from './services/forgot-password.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Twitter from AliExpress';

  constructor(private rout: Router, private authservice: AuthService, private forgotPasswordService:ForgotPasswordService){

  }
  ngOnInit(): void {
    console.log(this.rout.url)
    if(!this.authservice.loggedIn()){
      this.navigateToHome()
    }
    // else{
    //   this.navigateToLogin()

    // }
    
    
  }

  navigateToLogin(){
    this.rout.navigate(['/login'])
  }
  
  navigateToProfile(){
    this.rout.navigate(['/profile'])
  }

  navigateToHome(){
    this.rout.navigate(['/home'])
  }

  // navigateToResetPassword(){
  //   this.rout.navigate(['/reset-password'], this.forgotPasswordService.id, this.forgotPasswordService.token)
  // }


}
