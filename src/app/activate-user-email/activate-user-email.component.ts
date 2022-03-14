import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountVerificationService } from '../services/account-verification.service';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';
import { ToolbarService } from '../services/toolbar.service';

@Component({
  selector: 'app-activate-user-email',
  templateUrl: './activate-user-email.component.html',
  styleUrls: ['./activate-user-email.component.css']
})
export class ActivateUserEmailComponent implements OnInit , OnDestroy{
  token: any;
  tokenNotValid: boolean = false
  notSignedIn: boolean = false
  tokenIsExpired: boolean = false
  
  

  constructor(private accountVerification: AccountVerificationService,private authService: AuthService, private route: Router, private activatedRoute: ActivatedRoute, private snackBar: SnackbarService, private toolbarService: ToolbarService) { }
  ngOnDestroy(): void {
    this.toolbarService.inLogInOrSignUpOrConfirmEmail = false
  }

  ngOnInit(): void {
    this.toolbarService.inLogInOrSignUpOrConfirmEmail = true
    this.tokenValidationAndDecoding()
  }

  tokenValidationAndDecoding(){
    this.token = this.activatedRoute.snapshot.params.token
    if(!this.accountVerification.isTokenValid(this.token)){
      this.accountVerification.decodeToken(this.token)
      this.accountVerification.confirmEmail(this.accountVerification.decodedToken.userId)
      .subscribe(
        (res: {message})=>{
          this.snackBar.openSuccessSnackbar(res.message, 'Ok')
          this.route.navigate(['/login'])
        },
        (err)=>{
          this.snackBar.openErrSnackbar(err.error.message, 'Ok')
          this.tokenNotValid = true
          this.notSignedIn = true
        }
      )

    }
    else{
      this.tokenNotValid = true
      this.tokenIsExpired = true
    }
  }

  sendVerificationLink(){

  }



}
