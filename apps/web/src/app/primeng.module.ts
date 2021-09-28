import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';

import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  exports: [
    MenubarModule,
    TabMenuModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    TableModule,
    ToolbarModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class PrimengModule {}
