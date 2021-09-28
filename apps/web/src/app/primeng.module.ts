import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
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
  ],
  providers: [MessageService, ConfirmationService],
})
export class PrimengModule {}
