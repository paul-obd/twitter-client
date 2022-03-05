import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Tweet } from '../models/tweet.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {


  userEmail: string;
  userName: string;
  userId: string
  userPassword: string;
  userPost: Tweet[]

  

  constructor(private authService: AuthService, private snackbar: SnackbarService) { }
  ngAfterViewInit(): void {
    this.getProfile()
  }

  ngOnInit(): void {
 
  }

  getProfile(){
    this.authService.getProfile().subscribe(
      (user: User)=>{
      this.userEmail = user.email
      this.userName = user.userName
      this.userId = user._id
      this.userPost = user.posts
      this.userPassword = user.password
      this.authService.user = user
  
    },
    (err)=>{
      this.snackbar.openErrSnackbar(err.error.message, 'Ok')
      
    }
    )
  }

}
