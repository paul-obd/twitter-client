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

  constructor(private tweetService: TweetService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllTweets()
  }

  getAllTweets(){
    this.tweetService.getTweets().subscribe(
      (res: any[])=>{
       this.tweets = res       
      })
  }

}
