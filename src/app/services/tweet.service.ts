import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tweet } from '../models/tweet.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  PORT = "http://localhost:3000/"
  constructor(private http: HttpClient, private authService: AuthService) { }

  getTweets() {
    return this.http.get(this.PORT + 'posts/all-posts')
  }

  getOneTweet(tweetId: string){
    return this.http.get(this.PORT + 'posts/one-post/' + tweetId )
  }

  postTweet(tweet: Tweet) {

    const formData = new FormData();
    formData.append('title', tweet.title);
    formData.append('image', tweet.image);
    formData.append('content', tweet.content);
   // formData.append('creator', tweet.creator);

    return this.http.post(this.PORT + 'posts/add-post', formData,{
      reportProgress: true,
      observe: 'events',
      headers: {'Authorization': this.authService.authToken},
    })

  }


  updatePost(tweet: Tweet) {
    const formData = new FormData();
    if (tweet.imageUrl && tweet.image)
    {
      formData.append('image', tweet.image);
      formData.append('imageUrl', tweet.imageUrl);
    } 
    else if (tweet.imageUrl && !tweet.image) 
    {
      formData.append('imageUrl', tweet.imageUrl);
    } 
    else if (!tweet.imageUrl && tweet.image) 
    {
      formData.append('image', tweet.image);
    }
      formData.append('title', tweet.title);
      formData.append('content', tweet.content);
      //formData.append('creator', tweet.creator);

    return this.http.put(this.PORT + 'posts/put-post/' + tweet._id, formData, {headers: {'Authorization': this.authService.authToken}})
  }
}
