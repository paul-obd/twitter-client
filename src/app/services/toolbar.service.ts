import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  inHome: boolean = false
  inProfile: boolean = false
  inAddTweet: boolean = false
  inUpdateTweet: boolean = false
  inLogInOrSignUpOrConfirmEmail: boolean = false
  inForgotPassword: boolean = false


  constructor() { }
}
