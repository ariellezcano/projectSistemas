import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { PagesRoutingModule } from "./pages-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { PagesComponent } from "./pages.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './compartido/sidebar/sidebar.component';
import { NavbarComponent } from './compartido/navbar/navbar.component';
import { LstEstadoComponent } from './lst/lst-estado/lst-estado.component';

@NgModule({
    declarations: [
      PagesComponent,
      SidebarComponent,
      NavbarComponent,
      LstEstadoComponent,
      
    ],
    exports: [],
    imports: [
      BrowserModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      PagesRoutingModule,
      BrowserAnimationsModule,
    ],
    providers: [],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
    bootstrap: [PagesComponent],
  })
  export class PagesModule {}