import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Tweet } from '../models/tweet.model';
import { AuthService } from '../services/auth.service';
import { TweetService } from '../services/tweet.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  tweets: any[] = []
  scrollNumber = 1
  spin: boolean = false

  constructor(private tweetService: TweetService, private authService: AuthService) { }

  ngOnInit(): void {
    this.spin = true
    this.tweetService.getTweets(this.scrollNumber).subscribe(
      (res: any[])=>{
       res.forEach(tweet=>{
         this.tweets.push(tweet)
       })
       this.spin = false
       this.scrollNumber += 1   
          
      })
  }

  onScroll(){
    this.getAllTweets()
  }

  getAllTweets(){
    this.tweetService.getTweets(this.scrollNumber).subscribe(
      (res: any[])=>{
       res.forEach(tweet=>{
         this.tweets.push(tweet)
       })
       this.scrollNumber += 1   
          
      })
  }

}
