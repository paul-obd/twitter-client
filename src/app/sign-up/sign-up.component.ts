import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AccountVerificationService } from '../services/account-verification.service';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';
import { ToolbarService } from '../services/toolbar.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  
  signUpForm: FormGroup
  uploadProgress: boolean = false;
  clicked: boolean = false;
  signedUp: boolean = false;
  seconds: number = 0

  constructor(private toolbarService:ToolbarService,private route: Router, private formBuilder: FormBuilder, private authService: AuthService, private snackBar: SnackbarService, private accountVerificationService: AccountVerificationService) { }
  ngOnDestroy(): void {
    this.toolbarService.inLogInOrSignUpOrConfirmEmail = false
  }

  ngOnInit(): void {
   
    this.hideToolbarTabs()
    this.initSignUpForm()
    
  }
  
  hideToolbarTabs(){
    this.toolbarService.inLogInOrSignUpOrConfirmEmail = true

 }

 
 resendEmailValidator() {
  this.seconds = 59

  var intervalId = setInterval(() => {
      this.seconds -= 1
      if (this.seconds == 0) {
        clearInterval(intervalId)
      }

    }, 1000);

}

resendConfrmationEmail(){
  this.accountVerificationService.reSendConfirmationCode(this.signUpForm.get('email').value).subscribe
  ((res: HttpEvent<{ message, user }>) => {

  if (res.type === HttpEventType.UploadProgress) {
    this.uploadProgress = true
    
  }else if (res.type === HttpEventType.Response) {
    this.uploadProgress = false
    this.resendEmailValidator()
    this.snackBar.openSnackbar(res.body.message, 'Ok', 6000, 'green-snackbar')
  }
  },
  (err)=>{
    this.uploadProgress = false
    this.snackBar.openErrSnackbar(err.error.message, 'OK')
  }
  )
}

  initSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required]],
    },
    );
  }



  onSignUpSubmit() {

    if (this.signUpForm.get('email').invalid) {
      this.snackBar.openSnackbar('Please enter a valid e-mail', 'Ok', '6000', 'red-snackbar')
    }
    else if (this.signUpForm.get('userName').invalid) {
      this.snackBar.openSnackbar("Username length should be minimum 2", 'Ok', '6000', 'red-snackbar')
    }
    else if (this.signUpForm.get('password').invalid) {
      this.snackBar.openSnackbar("Password length should be minimum 6 ", 'Ok', '6000', 'red-snackbar')
    }
    else if (this.signUpForm.get('password').value !== this.signUpForm.get('rePassword').value) {
      this.snackBar.openSnackbar('Passwords should match!', 'Ok', '6000', 'red-snackbar')
    }
    else {
      this.clicked = true
      this.uploadProgress = true
      let user = new User()
      user.email = this.signUpForm.get('email').value
      user.userName = this.signUpForm.get('userName').value
      user.password = this.signUpForm.get('password').value
      this.authService.signUp(user).subscribe(
        (res: HttpEvent<{ message, user }>) => {

          if (res.type === HttpEventType.UploadProgress) {
            
            this.uploadProgress = true

          } else if (res.type === HttpEventType.Response) {
            this.signedUp = true
            this.resendEmailValidator()
            this.uploadProgress = false
            this.clicked = false;
            this.snackBar.openSnackbar(res.body.message, 'okay', '6000', 'green-snackbar')
           // this.route.navigate(['login'])
          }},

          (err) => {
            
            this.uploadProgress = false
            this.clicked = false;
            if (err.error.data) {
              for (let i = 0; i < err.error.data.length; i++) {
                const element = err.error.data[i];

                this.snackBar.openSnackbar(element.msg, 'okay', '6000', 'red-snackbar');
                break;


              }
            }
            else {
              this.snackBar.openSnackbar(err.error.message, 'okay', '60000', 'red-snackbar');
            }


          }
      
      )



    }






  }

}
