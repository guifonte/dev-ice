import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ErrorInterceptor } from './error-interceptor';
import { CategoryListComponent } from './category-list/category-list.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { PrimengModule } from './primeng.module';
import { MainContainerComponent } from './main-container/main-container.component';
import { EllipsableTextComponent } from './ellipsable-text/ellipsable-text.component';
import { EllipsisDirective } from './ellipsable-text/ellipsis.directive';
import { TableToolbarComponent } from './table-toolbar/table-toolbar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    DeviceListComponent,
    HeaderComponent,
    MainContainerComponent,
    EllipsableTextComponent,
    EllipsisDirective,
    TableToolbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    PrimengModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
