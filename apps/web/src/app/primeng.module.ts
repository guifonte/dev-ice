import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';

@NgModule({
  exports: [MenubarModule, TabMenuModule],
})
export class PrimengModule {}
