import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarService } from '../services/toolbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private route: Router, public toolbarService: ToolbarService, private location: Location) { }

  ngOnInit(): void {
  }


  goBack(){
    this.location.back()
  }

  navigateToHome(){
    this.route.navigate(['/home'])
  }

  navigateToAddTweet(){
    this.route.navigate(['/add-tweet'])
  }
  navigateToProfile(){
    this.route.navigate(['/profile'])
  }

}
