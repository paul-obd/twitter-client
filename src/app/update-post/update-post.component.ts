import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tweet } from '../models/tweet.model';
import { TweetService } from '../services/tweet.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {

  tweetForm: FormGroup;
  tweetImg: string = null
  PORT = "http://localhost:3000/"

  tweetId = "621a475bc83f155c1b6f9dfb"


  constructor(private formBuilder: FormBuilder, private tweetService: TweetService) { }

  ngOnInit(): void {
    this.tweetFormInit()
    this.getTheTweet(this.tweetId)
  }

  getTheTweet(tweetId: string){
    this.tweetService.getOneTweet(tweetId).subscribe(
      (res: Tweet) => {
        if (res.imageUrl) {
          this.tweetImg = res.imageUrl
        }
        this.tweetForm.get('title').setValue(res.title)
        this.tweetForm.get('content').setValue(res.content)       
      }
    )
  }

  tweetFormInit(){
   this.tweetForm =  this.formBuilder.group({
      title: ['', [Validators.required]],
      image: [''],
      content: ['',[Validators.required]]  
    });
  }

  onFileSelected(event){

    const file = event.target.files[0];
    this.tweetForm.get('image').setValue(file);
  }

  onSubmit(){
     let tweet = new Tweet();
     if(this.tweetImg != null && this.tweetForm.get('image').valid)
     {
      tweet.image = this.tweetForm.get('image').value
      tweet.imageUrl = this.tweetImg
     }
     else if(this.tweetImg != null && !this.tweetForm.get('image').valid)
     {
      tweet.imageUrl = this.tweetImg 
     }
     else if(this.tweetImg = null && this.tweetForm.get('image').valid)
     {
      tweet.image = this.tweetForm.get('image').value
     }
     tweet._id = this.tweetId
     tweet.title = this.tweetForm.get('title').value
     tweet.content = this.tweetForm.get('content').value
     tweet.creator = "paul obeid"

     this.tweetService.updatePost(tweet).subscribe(
     (res) => console.log(res),
     (err) => console.log(err)
     )
  }
}
