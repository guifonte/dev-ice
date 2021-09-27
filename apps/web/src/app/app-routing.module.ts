import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryListComponent } from './category-list/category-list.component';
import { DeviceListComponent } from './device-list/device-list.component';

const routes: Routes = [
  { path: 'categories', component: CategoryListComponent },
  { path: 'devices', component: DeviceListComponent },
  { path: '', redirectTo: '/devices', pathMatch: 'full' },
  { path: '**', redirectTo: '/devices', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
