import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() creatorUsername: any
  @Input() imgUrl?: string
  @Input() content: string
  @Input() title: string

  currentUserName: string

  
  PORT = "http://localhost:3000/"

  constructor(private authService: AuthService) {

   }

  ngOnInit(): void {
    this.getCreatorUserName()
    this.getUserOfaPost()
  }

  getCreatorUserName(){
    this.currentUserName = this.authService.user.userName
  }

  getUserOfaPost(){
    
    this.authService.getOneUser(this.creatorUsername).subscribe((res: User)=>{
      this.creatorUsername = res.userName
    })
  }

}
