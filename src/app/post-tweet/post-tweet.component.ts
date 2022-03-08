import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tweet } from '../models/tweet.model';
import { SnackbarService } from '../services/snackbar.service';
import { ToolbarService } from '../services/toolbar.service';
import { TweetService } from '../services/tweet.service';

@Component({
  selector: 'app-post-tweet',
  templateUrl: './post-tweet.component.html',
  styleUrls: ['./post-tweet.component.css']
})
export class PostTweetComponent implements OnInit, OnDestroy {


  tweetForm: FormGroup;
  imageSrc: string | ArrayBuffer;
  uploadProgress: boolean = false
  notclicked: boolean = true

  constructor(private route: Router,private formBuilder: FormBuilder, private tweetService: TweetService, private snackBar: SnackbarService, private toolbarService: ToolbarService) { }
  ngOnDestroy(): void {
    this.toolbarService.inAddTweet = false
  }

  ngOnInit(): void {
    this.toolbarService.inAddTweet = true
    this.tweetFormInit()
    
  }

  tweetFormInit() {
    this.tweetForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      image: [''],
      content: ['', [Validators.required]]
    });
  }


  onFileSelected(event) {

    const file = event.target.files[0];
    if (file) {
      this.tweetForm.get('image').setValue(file);
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = e.target.result;

      reader.readAsDataURL(file);
    }

  }


  removeImage() {
    this.imageSrc = null
    this.tweetForm.get('image').setValue(null);
  }


  onSubmit() {
    if (!this.tweetForm.get('title').valid) {
      this.snackBar.openErrSnackbar('Title is required!', 'Ok')
    }
    else if (!this.tweetForm.get('content').valid) {
      this.snackBar.openErrSnackbar('Content is required!', 'Ok')
    }
    else {
      this.notclicked = false
      let tweet = new Tweet();
      tweet.title = this.tweetForm.get('title').value
      tweet.content = this.tweetForm.get('content').value
      tweet.image = this.tweetForm.get('image').value


      this.tweetService.postTweet(tweet).subscribe(
        (res: HttpEvent<any>) =>{
    
          if(res.type === HttpEventType.UploadProgress){
            
            this.uploadProgress = true
        
          }else if(res.type === HttpEventType.Response){
            this.uploadProgress = false
            this.notclicked = true
            this.tweetForm.get('title').setValue(null)
            this.tweetForm.get('content').setValue(null)
            this.tweetForm.get('image').setValue(null)
            this.imageSrc = null
            this.snackBar.openSuccessSnackbar('Tweet is posted successfully!', '')
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
    }


  }

}
