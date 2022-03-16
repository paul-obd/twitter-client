import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Tweet } from '../models/tweet.model';
import { SnackbarService } from '../services/snackbar.service';
import { TweetService } from '../services/tweet.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {

  tweetForm: FormGroup;
  tweetImg: any = null
  slectedImg: any;
  uploadProgress: boolean = false
  notclicked: boolean = true
  removedImage: string;
  spin: boolean = false
  loadSpin: boolean = false

  PORT = "http://localhost:3000/"

  tweetId: any;


  constructor(private snackBar: SnackbarService,private formBuilder: FormBuilder, private tweetService: TweetService, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.tweetFormInit()
    this.getTheTweet()
  }

  getTheTweet(){
    this.loadSpin = true
    this.tweetId = this.activatedRoute.snapshot.params.id
    this.tweetService.getOneTweet(this.tweetId).subscribe(
      (res: Tweet) => {
        
        if (res.imageUrl) {
          this.tweetImg = res.imageUrl
        }
        this.tweetForm.get('title').setValue(res.title)
        this.tweetForm.get('content').setValue(res.content)   
        this.loadSpin = false    
      }
    )
  }

  tweetFormInit(){
   this.tweetForm =  this.formBuilder.group({
      title: ['', [Validators.required]],
      image: ['', Validators.required],
      content: ['',[Validators.required]]  
    });
  }

  onFileSelected(event){

    this.spin = true
    const file = event.target.files[0];
    if (file) {
      this.tweetForm.get('image').setValue(file);
      const reader = new FileReader();
      reader.onload = e =>{ 
        
        this.slectedImg = e.target.result
        this.spin = false
      };

      reader.readAsDataURL(file);
    }
  }
  removeImage() {
    if(this.tweetImg != null){
      this.removedImage = this.tweetImg
      this.tweetImg = null
    }
    if(this.slectedImg){
      this.slectedImg = null
    }
    this.tweetForm.get('image').setValue(null);
  }

  onSubmit(){
    if (!this.tweetForm.get('title').valid) {
      this.snackBar.openErrSnackbar('Title is required!', 'Ok')
    }
    else if (!this.tweetForm.get('content').valid) {
      this.snackBar.openErrSnackbar('Content is required!', 'Ok')
    }
    else {
     this.notclicked = false
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
     else if(!this.tweetImg && this.tweetForm.get('image').valid)
     {
      tweet.image = this.tweetForm.get('image').value
     }
     else if(this.removedImage){
       tweet.removedImg = this.removedImage
       this.removedImage = null
     }
     tweet._id = this.tweetId
     tweet.title = this.tweetForm.get('title').value
     tweet.content = this.tweetForm.get('content').value
    

     this.tweetService.updatePost(tweet).subscribe(
     (res: HttpEvent<{message, post}>) =>{
    
      if(res.type === HttpEventType.UploadProgress){
        
        this.uploadProgress = true
    
      }else if(res.type === HttpEventType.Response){
        this.uploadProgress = false
        this.notclicked = true
        this.snackBar.openSuccessSnackbar(res.body.message, "Ok")
        this.route.navigate(['/profile'])
     }
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
  }}
}
