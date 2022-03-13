import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { ForgotPasswordService } from '../services/forgot-password.service';
import { SnackbarService } from '../services/snackbar.service';
import { ToolbarService } from '../services/toolbar.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit , OnDestroy{

  uploadProgress: boolean = false
  tokenIsValid: boolean = false
  userId: any
  resetPasswordForm: FormGroup
  token: any

  constructor(private authService: AuthService,private forgotPasswordService: ForgotPasswordService,private formBuilder: FormBuilder, private route: ActivatedRoute, private snackBar: SnackbarService, private navRoute: Router, private toolbarService: ToolbarService) { }
  ngOnDestroy(): void {
    this.toolbarService.inLogInOrSignUp = false
  }

  ngOnInit(): void {
    this.toolbarService.inLogInOrSignUp = true
    this.initResetPasswordForm()

    if(this.isTokenValid()){
      this.getUser()
    }
  }

  initResetPasswordForm(){
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required]],
      reNewPassword: ['',[Validators.required]]
    })
  }

  isTokenValid(){
    this.token = this.route.snapshot.params.token
   
    if(!this.forgotPasswordService.isTokenValid(this.token)){
     
      this.tokenIsValid = true
      return true
    }else{
   
      this.tokenIsValid = false
      return false
    }

  }

  getUser(){
    this.userId = this.route.snapshot.params.id
    this.authService.getOneUser(this.userId).subscribe(
      (res: User)=>{
        this.forgotPasswordService.user = res
      }
    )
  }


  onresetPasswordSubmit(){
    if(this.resetPasswordForm.get('newPassword').value !== this.resetPasswordForm.get('reNewPassword').value){
      this.snackBar.openErrSnackbar('Passwords should match', 'Ok')
    }
    else{
      this.forgotPasswordService.resetPassword(this.userId, this.resetPasswordForm.get('newPassword').value)
        .subscribe(
          (res: HttpEvent<{ message }>)=>{
            if (res.type === HttpEventType.UploadProgress) {
              this.uploadProgress = true
  
            }
            else if (res.type === HttpEventType.Response) {
              this.uploadProgress = false
              this.navRoute.navigate(['/login'])
              this.tokenIsValid = false
              this.snackBar.openSnackbar(res.body.message, 'Ok', 8000, 'green-snackbar' )
              this.resetPasswordForm.get('newPassword').setValue('')
              this.resetPasswordForm.get('reNewPassword').setValue('')
            }
          },
          (err)=>{
            this.snackBar.openErrSnackbar(err.error.message, 'Ok');

          }
        )

    }


  }

}
