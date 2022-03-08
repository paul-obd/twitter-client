import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToolbarService } from '../services/toolbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private toolbarService: ToolbarService) { }

  ngOnDestroy(): void {

    this.toolbarService.inHome = false
  }

  ngOnInit(): void {
    this.toolbarService.inHome = true
  }

}
