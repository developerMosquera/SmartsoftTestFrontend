import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { GridModule } from '@progress/kendo-angular-grid';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { DatosComponent } from './components/datos/datos.component';

import { RestService } from './services/rest.service';
import { AppService } from './services/app.service';
import { TableDataUnoComponent } from './components/table-data-uno/table-data-uno.component';
import { TableDataDosComponent } from './components/table-data-dos/table-data-dos.component';
import { TableDataTresComponent } from './components/table-data-tres/table-data-tres.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfiguracionComponent,
    DatosComponent,
    TableDataUnoComponent,
    TableDataDosComponent,
    TableDataTresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DropDownsModule,
    GridModule
  ],
  providers: [
    RestService,
    AppService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
