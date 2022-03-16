import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';
import { ToolbarService } from '../services/toolbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  logInForm: FormGroup
  emailOrPassword: string
  password: string

  clicked: boolean = false
  uploadProgress: boolean = false
  passIsVisible: boolean = false

  @ViewChild('passwordInput') passwordInput!: ElementRef<any>;


  constructor(private toolbarService:ToolbarService,private route: Router,private authService: AuthService, private formBuilder: FormBuilder, private snackbar: SnackbarService) { }
  ngOnDestroy(): void {
    this.toolbarService.inLogInOrSignUpOrConfirmEmail = false
  }

  ngOnInit(): void {
    this.initLogInForm()
    this.hideToolbarTabs()
  }

  hideToolbarTabs(){
     this.toolbarService.inLogInOrSignUpOrConfirmEmail = true

  }

  passwordVisibilty(){
    if (this.passwordInput.nativeElement.type === "password") {
      this.passIsVisible = true
      this.passwordInput.nativeElement.type = "text";
    } else {
      this.passIsVisible = false
      this.passwordInput.nativeElement.type = "password";
    }

  }


  initLogInForm() {
    this.logInForm = this.formBuilder.group({
      emailOrUsername: ['', [Validators.required]],
      logInpassword: ['', [Validators.required]]
    })
  }

  isEmail() {
    this.emailOrPassword = this.logInForm.get('emailOrUsername').value
    this.password =  this.logInForm.get('logInpassword').value
    this.logInForm = this.formBuilder.group({
      emailOrUsername: [this.emailOrPassword, [Validators.required, Validators.email]],
      logInpassword: [this.password, [Validators.required]]
    })
  }

  isNotEmail(){
    this.emailOrPassword = this.logInForm.get('emailOrUsername').value
    this.password =  this.logInForm.get('logInpassword').value
    this.logInForm = this.formBuilder.group({
      emailOrUsername: [this.emailOrPassword, [Validators.required]],
      logInpassword: [this.password, [Validators.required]]
    })
  }

   onLoginSubmit() {
    this.isEmail()
    this.clicked = true
    let user;
    if (this.logInForm.get('emailOrUsername').valid) {
      user = new User()
      user.email = this.logInForm.get('emailOrUsername').value
      user.password = this.logInForm.get('logInpassword').value
      this.isNotEmail()

    } else {
      user = new User()
      user.userName = this.logInForm.get('emailOrUsername').value
      user.password = this.logInForm.get('logInpassword').value
      this.isNotEmail()
    }



    this.authService.logIn(user).subscribe(
    (res:  HttpEvent<{token, user}>)=>{

      if(res.type === HttpEventType.UploadProgress){
        this.uploadProgress = true
        
      }
      else if(res.type === HttpEventType.Response){
        this.authService.storeAndSetAuthData(res.body.user, res.body.token)
        this.snackbar.openSuccessSnackbar('Logged in successfully', "Ok")
        
        this.route.navigate(['/home'])
        this.uploadProgress = false
        this.clicked = false
        this.isNotEmail()
  
      }

    },
      (err)=>{
       
        this.uploadProgress = false
        this.clicked = false
        this.isNotEmail()
        if(err.error.data){
          for (let i = 0; i < err.error.data.length; i++) {
            const element = err.error.data[i];
            
              this.snackbar.openErrSnackbar(element.msg, 'Ok');
              break;
            
            
          }
        }
        else {
          this.snackbar.openErrSnackbar(err.error.message, 'Ok');
        }
      
        
      }
    
    )



  }








}
