import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '@dev-ice/domain';

import { environment as env } from '../environments/environment';

@Component({
  selector: 'dev-ice-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Category[]>(env.baseURL + '/api/categories');
  constructor(private http: HttpClient) {}
}
