import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dev-ice-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss'],
})
export class DeviceListComponent implements OnInit {
  // constructor() { }

  ngOnInit(): void {
    console.log('init');
  }
}
