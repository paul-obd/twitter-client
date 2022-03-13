import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  PORT = "http://localhost:3000/"

  id: any
  token: any
  user: User

  constructor(private http: HttpClient, private route: Router, private activatedRoute: ActivatedRoute) { }

  forgotPassword(email: string){
   return  this.http.post(this.PORT+ 'user/forgot-password', {email: email}, {
    reportProgress: true,
    observe: 'events'
   })
  }
  
  resetPassword(userId, newPassword){
  
    return this.http.put(this.PORT+'user/reset-password', {id: userId, password: newPassword}, {
      reportProgress: true,
      observe: 'events'
     } )
  }

  isToResetPassword(){
    if(this.route.url == '/reset-password/:id/:token'){
     this.id =  this.activatedRoute.snapshot.params.id
     this.token =  this.activatedRoute.snapshot.params.token
    return true
    }
    else{
      return false
    }

  }

  isTokenValid(token){
    const helper = new JwtHelperService();
    console.log('hlper')
    return helper.isTokenExpired(token);
  }
}
