import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tweet } from '../models/tweet.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';
import { ToolbarService } from '../services/toolbar.service';
import { TweetService } from '../services/tweet.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit, OnDestroy {


  userEmail: string;
  userName: string;
  userId: string
  userPassword: string;
  userPosts: Tweet[] = [];
  currentUserName: string 
  spin: boolean = false


  
  constructor(public authService: AuthService,private tweetService: TweetService, private snackbar: SnackbarService, private toolbarService: ToolbarService, private route: Router) { }


  ngOnDestroy(): void {
    this.toolbarService.inProfile = false
  }

  ngAfterViewInit(): void {
    this.getProfile()
  }

  ngOnInit(): void {
    this.spin = true
    this.toolbarService.inProfile = true

  }

  getProfile() {
    this.authService.getProfile().subscribe(
      (user: User) => {
        this.authService.userPosts = []

        this.userEmail = user.email
        this.userName = user.userName
        this.userId = user._id
        this.userPassword = user.password
        this.authService.user = user
        this.currentUserName = this.authService.user.userName

        user.posts.forEach(post=> {
          
          this.authService.userPosts.push(post)
          
        });
        this.spin = false

      },
      (err) => {
        this.snackbar.openErrSnackbar(err.error.message, 'Ok')
        this.spin = false
      }
    )
  }

  logout(){
    if(confirm('Are you sure you want to logout?'))
      this.authService.logOut()
      this.route.navigate(['/login'])
    
  }

}
