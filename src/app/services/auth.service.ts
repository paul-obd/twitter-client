import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  PORT = "http://localhost:3000/"

  authToken: any
  user: any
  

  constructor(private http: HttpClient) { }


  signUp(user){
   return this.http.post(this.PORT + 'user/signup', user)
  }

  logIn(user){
   return this.http.post(this.PORT + 'user/login', user)

  }

  getProfile(){
    this.loadTokenAndUser()
    // let headers = new Headers()
    // headers.append('Authorization', this.authToken)
    return this.http.get(this.PORT + 'user/profile', {headers: {'Authorization': this.authToken}})
  }

  getOneUser(userId){
    return this.http.get(this.PORT +`user/one-user/${userId}`)
  }

  storeAndSetAuthData(user, token){
    localStorage.setItem('id_token', token)
    localStorage.setItem('user', JSON.stringify(user))
    this.authToken = token
    this.user = user 
  }

  loadTokenAndUser(){
    const token = localStorage.getItem('id_token')
    const user = localStorage.getItem('user')
    this.authToken = token
    this.user = JSON.parse(user)
  }

  loggedIn(){
    const helper = new JwtHelperService();
    const token = localStorage.getItem('id_token')
    return helper.isTokenExpired(token);
  }


  logOut(){
    this.user = null
    this.authToken = null
    localStorage.clear()
  }

}
