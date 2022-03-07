import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Tweet } from '../models/tweet.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';
import { TweetService } from '../services/tweet.service';

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
  userPosts: Tweet[] = [];
  currentUserName: string 



  constructor(private authService: AuthService,private tweetService: TweetService, private snackbar: SnackbarService) { }
  ngAfterViewInit(): void {
    this.getProfile()
  }

  ngOnInit(): void {

  }

  getProfile() {
    this.authService.getProfile().subscribe(
      (user: User) => {
        console.log(user.posts)
        this.userEmail = user.email
        this.userName = user.userName
        this.userId = user._id
        this.userPassword = user.password
        this.authService.user = user
        this.currentUserName = this.authService.user.userName

        user.posts.forEach(post=> {
          this.tweetService.getOneTweet(post).subscribe((tweet: Tweet)=>{
            
            this.userPosts.push(tweet)

          })
          
        });

      },
      (err) => {
        this.snackbar.openErrSnackbar(err.error.message, 'Ok')

      }
    )
  }

}
