import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'dev-ice-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items!: MenuItem[];

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Devices',
        routerLink: '/devices',
        routerLinkActiveOptions: { exact: true },
        expanded: this.checkActiveState('/devices'),
      },
      {
        label: 'Categories',
        routerLink: '/categories',
        routerLinkActiveOptions: { exact: true },
        expanded: this.checkActiveState('/categories'),
      },
    ];
  }

  checkActiveState(givenLink: string) {
    console.log(this.router.url);
    if (this.router.url.indexOf(givenLink) === -1) {
      return false;
    } else {
      return true;
    }
  }
}
