import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';

@NgModule({
  exports: [MenubarModule, TabMenuModule, ButtonModule],
})
export class PrimengModule {}
