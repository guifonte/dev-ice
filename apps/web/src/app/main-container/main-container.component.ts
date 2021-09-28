import { Component, Input } from '@angular/core';

@Component({
  selector: 'dev-ice-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
})
export class MainContainerComponent {
  @Input() headerText!: string;
}
