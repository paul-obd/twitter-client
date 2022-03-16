import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import { AccountVerificationService } from '../services/account-verification.service';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';
import { ToolbarService } from '../services/toolbar.service';

@Component({
  selector: 'app-activate-user-email',
  templateUrl: './activate-user-email.component.html',
  styleUrls: ['./activate-user-email.component.css']
})
export class ActivateUserEmailComponent implements OnInit, OnDestroy {
  token: any;
  tokenNotValid: boolean = false
  notSignedIn: boolean = false
  tokenIsExpired: boolean = false
  uploadProgress: boolean = false
  user: User;
  seconds: number = 0
  clicked: boolean = false



  constructor(private accountVerification: AccountVerificationService, private authService: AuthService, private route: Router, private activatedRoute: ActivatedRoute, private snackBar: SnackbarService, private toolbarService: ToolbarService) { }
  ngOnDestroy(): void {
    this.toolbarService.inLogInOrSignUpOrConfirmEmail = false
  }

  ngOnInit(): void {
    this.toolbarService.inLogInOrSignUpOrConfirmEmail = true
    this.tokenValidationAndDecoding()
  }

  tokenValidationAndDecoding() {
    this.token = this.activatedRoute.snapshot.params.token
    if (!this.accountVerification.isTokenValid(this.token)) {
      this.accountVerification.decodeToken(this.token)
      this.accountVerification.confirmEmail(this.accountVerification.decodedToken.userId)
        .subscribe(
          (res: { message, user: User }) => {
            this.snackBar.openSuccessSnackbar(res.message, 'Ok')
            this.route.navigate(['/login'])

          },
          (err) => {
            this.snackBar.openErrSnackbar(err.error.message, 'Ok')
            this.tokenNotValid = true
            this.notSignedIn = true
          }
        )

    }
    else {
      this.tokenNotValid = true
      this.tokenIsExpired = true
    }
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


  sendVerificationLink() {
    this.token = this.activatedRoute.snapshot.params.token
    this.accountVerification.decodeToken(this.token)
    this.accountVerification.reSendConfirmationCode(this.accountVerification.decodedToken.email).subscribe(
      (res: HttpEvent<{ message, user }>) => {

        if (res.type === HttpEventType.UploadProgress) {
          this.uploadProgress = true

        } else if (res.type === HttpEventType.Response) {
          this.uploadProgress = false
          this.clicked = true
          this.resendEmailValidator()
          this.snackBar.openSnackbar(res.body.message, 'Ok', 6000, 'green-snackbar')
        }
      },
      (err) => {
        this.uploadProgress = false
        this.snackBar.openErrSnackbar(err.error.message, 'OK')
      }
    )


  }



}
