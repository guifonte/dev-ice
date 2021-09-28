import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'dev-ice-table-toolbar',
  templateUrl: './table-toolbar.component.html',
  styleUrls: ['./table-toolbar.component.css'],
})
export class TableToolbarComponent {
  @Output() createEvent = new EventEmitter();

  handleCreate() {
    this.createEvent.emit();
  }
}
