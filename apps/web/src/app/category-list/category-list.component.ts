import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dev-ice-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  // constructor() { }

  ngOnInit(): void {
    console.log('init');
  }
}
