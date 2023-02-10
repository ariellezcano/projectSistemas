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
import { FilEstadosComponent } from './filters/fil-estados/fil-estados.component';
import { AbmEstadosComponent } from './frm-abm/abm-estados/abm-estados.component';
import { LstTipoServidorComponent } from './lst/lst-tipo-servidor/lst-tipo-servidor.component';
import { FilTipoServidorComponent } from './filters/fil-tipo-servidor/fil-tipo-servidor.component';
import { AbmTipoServidorComponent } from './frm-abm/abm-tipo-servidor/abm-tipo-servidor.component';
import { AbmServidoresComponent } from './frm-abm/abm-servidores/abm-servidores.component';
import { LstServidoresComponent } from './lst/lst-servidores/lst-servidores.component';
import { FilServidoresComponent } from './filters/fil-servidores/fil-servidores.component';
import { ComboTipoServidorComponent } from './component/combo-tipo-servidor/combo-tipo-servidor.component';
import { LstSistemasComponent } from './lst/lst-sistemas/lst-sistemas.component';
import { AbmSistemasComponent } from './frm-abm/abm-sistemas/abm-sistemas.component';
import { FilSistemasComponent } from './filters/fil-sistemas/fil-sistemas.component';
import { FilAutocompletadoUnidadComponent } from './component/fil-autocompletado-unidad/fil-autocompletado-unidad.component';
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { ComboEstadosComponent } from './component/combo-estados/combo-estados.component';
import { PrincipalComponent } from './compartido/principal/principal.component';
import { ComboServidorComponent } from './component/combo-servidor/combo-servidor.component';

@NgModule({
    declarations: [
      PagesComponent,
      SidebarComponent,
      NavbarComponent,
      LstEstadoComponent,
      FilEstadosComponent,
      AbmEstadosComponent,
      LstTipoServidorComponent,
      FilTipoServidorComponent,
      AbmTipoServidorComponent,
      AbmServidoresComponent,
      LstServidoresComponent,
      FilServidoresComponent,
      ComboTipoServidorComponent,
      LstSistemasComponent,
      AbmSistemasComponent,
      FilSistemasComponent,
      FilAutocompletadoUnidadComponent,
      ComboEstadosComponent,
      PrincipalComponent,
      ComboServidorComponent,
      
    ],
    exports: [],
    imports: [
      BrowserModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      PagesRoutingModule,
      AutocompleteLibModule,
      BrowserAnimationsModule,
    ],
    providers: [],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
    bootstrap: [PagesComponent],
  })
  export class PagesModule {}