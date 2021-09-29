import { Component } from '@angular/core';

@Component({
  selector: 'dev-ice-ellipsable-text',
  template: `<div devIceIsEllipsis class="text-el">
    <ng-content></ng-content>
  </div>`,
  styles: [
    '.text-el { text-overflow: ellipsis; white-space: nowrap; overflow: hidden; }',
  ],
})
export class EllipsableTextComponent {}
