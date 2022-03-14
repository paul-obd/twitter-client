import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AccountVerificationService {
  PORT = "http://localhost:3000/"
  decodedToken: any;

  constructor(private http: HttpClient) { }


  confirmEmail(userId){
    return this.http.put(this.PORT+ 'user/confirm-email/'+ userId, {})
  }

  decodeToken(token) {
    const helper = new JwtHelperService();
    this.decodedToken = helper.decodeToken(token);
  }

  isTokenValid(token) {
    const helper = new JwtHelperService();
    return helper.isTokenExpired(token);
  }
}
