import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../services/forgot-password.service';
import { SnackbarService } from '../services/snackbar.service';
import { ToolbarService } from '../services/toolbar.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {


  forgotPasswordForm: FormGroup
  uploadProgress: Boolean = false
  seconds: number = 0

  constructor(private forgotPasswordService: ForgotPasswordService, private formBuilder: FormBuilder, private snackBar: SnackbarService, private toolbarService: ToolbarService) { }
  ngOnDestroy(): void {
    this.toolbarService.inForgotPassword = false
  }

  ngOnInit(): void {
    this.toolbarService.inForgotPassword = true
    this.initforgotPasswordForm()
  }


  initforgotPasswordForm() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
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

  onEmailSubmit() {
    if (!this.forgotPasswordForm.get('email').valid) {
      this.snackBar.openErrSnackbar("Please enter a valid email!", 'Ok')
    }
    else {

      this.forgotPasswordService.forgotPassword(this.forgotPasswordForm.get('email').value).subscribe(

        ((res: HttpEvent<{ message }>) => {

          if (res.type === HttpEventType.UploadProgress) {
            this.uploadProgress = true

          }
          else if (res.type === HttpEventType.Response) {
            this.uploadProgress = false
            this.resendEmailValidator()

            this.snackBar.openSnackbar(res.body.message, 'Ok', 8000, 'green-snackbar' )
          }
        }),
        (err => {
          this.snackBar.openErrSnackbar(err.error.message, 'Ok');
        })
      )




    }


  }
}