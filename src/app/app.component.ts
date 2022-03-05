import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'twitter';
  constructor(private rout: Router, private authservice: AuthService){

  }
  ngOnInit(): void {

    if(!this.authservice.loggedIn()){
      this.navigateToProfile()
    }else{
      this.navigateToLogin()

    }
    
    
  }

  navigateToLogin(){
    this.rout.navigate(['/login'])
  }
  
  navigateToProfile(){
    this.rout.navigate(['/profile'])
  }


}
