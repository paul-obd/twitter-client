import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tweet } from '../models/tweet.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';
import { TweetService } from '../services/tweet.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() id: any
  @Input() creatorUsername: any
  @Input() imgUrl?: string
  @Input() content: string
  @Input() title: string

  currentUserName: string

  
  PORT = "http://localhost:3000/"

  constructor(private authService: AuthService,private tweetService: TweetService,private snackBar: SnackbarService, private route: Router, private cdr: ChangeDetectorRef) {

   }

  ngOnInit(): void {
    this.getCreatorUserName()
   // this.getUserOfaPost()
  }

  getCreatorUserName(){
    this.currentUserName = this.authService.user.userName
  }

  editTweet(){
    this.route.navigate([`/update-post/${this.id}`])
  }

  deleteTweet(){
    if(confirm('Are you sure you want to delete this tweet?'))
    {
      
      this.tweetService.deletePost(this.id).subscribe((res:{message, post})=>{
        this.getProfile()
        this.snackBar.openSuccessSnackbar(res.message, 'Ok')
        
        
      },
      
      (err) => {
        if(err.error.data){
          for (let i = 0; i < err.error.data.length; i++) {
            const element = err.error.data[i];
            
            this.snackBar.openSnackbar(element.msg, 'okay', '6000', 'red-snackbar');
              break;
            
            
          }
        }
        else {
          this.snackBar.openSnackbar(err.error.message, 'okay', '60000', 'red-snackbar');
        }
      }
      )
    }
   
  }

  getUserOfaPost(){
    
    this.authService.getOneUser(this.creatorUsername).subscribe((res: User)=>{
      this.creatorUsername = res.userName
    })
  }

  getProfile() {
    this.authService.getProfile().subscribe(
      (user: User) => {
        this.authService.userPosts = []

        user.posts.forEach(post=> {

          this.authService.userPosts.push(post)
          
        });

      },
      (err) => {
        this.snackBar.openErrSnackbar(err.error.message, 'Ok')

      }
    )
  }

}
