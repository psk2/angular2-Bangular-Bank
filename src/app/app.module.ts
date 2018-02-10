import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { CdkTableModule } from '@angular/cdk';
import { ReactiveFormsModule } from '@angular/forms';

import 'rxjs/Rx';
import {
  MdButtonModule,
  MdCheckboxModule,
  MdCardModule,
  MdInputModule,
  MdToolbarModule,
  MdSidenavModule,
  MdIconModule,
  MdIconRegistry ,
  MdListModule,
  MdTableModule,
  MdSortModule,
  MdPaginatorModule
} from '@angular/material';
/* User defined modules */
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { CircularComponent } from './circular/circular.component';
import { SearchComponent } from './search/search.component';
import { appRoutes } from './app.routes';
import { BloodBankDetailsComponent } from './blood-bank-details/blood-bank-details.component';
import { TableBasicExampleComponent } from './table-basic-example/table-basic-example.component';
import { CreateBloodBankComponent } from './create-blood-bank/create-blood-bank.component';

@NgModule({
  declarations: [
    AppComponent,
    CircularComponent,
    SearchComponent,
    UserComponent,
    BloodBankDetailsComponent,
    TableBasicExampleComponent,
    CreateBloodBankComponent

  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    MdButtonModule,
    MdCheckboxModule,
    MdCardModule,
    MdInputModule,
    MdToolbarModule,
    MdSidenavModule,
    MdIconModule,
    MdListModule,
    MdTableModule,
    FlexLayoutModule,
    CdkTableModule,
    MdSortModule,
    MdPaginatorModule,
    ReactiveFormsModule
  ],
  providers: [MdIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule { }
