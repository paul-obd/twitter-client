import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logInForm: FormGroup
  emailOrPassword: string
  password: string

  constructor(private route: Router,private authService: AuthService, private formBuilder: FormBuilder, private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.initLogInForm()
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

   onLoginSubmit() {
    this.isEmail()
    let user;
    if (this.logInForm.get('emailOrUsername').valid) {
      user = new User()
      user.email = this.logInForm.get('emailOrUsername').value
      user.password = this.logInForm.get('logInpassword').value

    } else {
      user = new User()
      user.userName = this.logInForm.get('emailOrUsername').value
      user.password = this.logInForm.get('logInpassword').value
    }

    this.authService.logIn(user).subscribe(
    (res: {token, user})=>{
      
      this.authService.storeAndSetAuthData(res.user, res.token)
      this.snackbar.openSuccessSnackbar('Logged in successfully', "Ok")
      
      this.route.navigate(['/home'])

    },
      (err)=>{
       
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
