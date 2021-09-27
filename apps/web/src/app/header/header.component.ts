import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dev-ice-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // constructor() { }

  ngOnInit(): void {
    console.log('init');
  }
}
