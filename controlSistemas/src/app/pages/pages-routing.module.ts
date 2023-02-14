import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './compartido/principal/principal.component';
import { AbmEntornoLenguajeComponent } from './frm-abm/abm-entorno-lenguaje/abm-entorno-lenguaje.component';
import { AbmEstadosComponent } from './frm-abm/abm-estados/abm-estados.component';
import { AbmServidoresComponent } from './frm-abm/abm-servidores/abm-servidores.component';
import { AbmSistemasComponent } from './frm-abm/abm-sistemas/abm-sistemas.component';
import { AbmSolicitudSistemasComponent } from './frm-abm/abm-solicitud-sistemas/abm-solicitud-sistemas.component';
import { AbmTipoServidorComponent } from './frm-abm/abm-tipo-servidor/abm-tipo-servidor.component';
import { LstEntornoLenguajeComponent } from './lst/lst-entorno-lenguaje/lst-entorno-lenguaje.component';
import { LstEstadoComponent } from './lst/lst-estado/lst-estado.component';
import { LstServidoresComponent } from './lst/lst-servidores/lst-servidores.component';
import { LstSistemasComponent } from './lst/lst-sistemas/lst-sistemas.component';
import { LstSolicitudSistemasComponent } from './lst/lst-solicitud-sistemas/lst-solicitud-sistemas.component';
import { LstTipoServidorComponent } from './lst/lst-tipo-servidor/lst-tipo-servidor.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      // {
      //   path: 'principal',
      //   component: PrincipalComponent,
      // },
      {
        path: 'lst-estados',
        children: [
          {
            path: 'abm/:id',
            component: AbmEstadosComponent,
          },
          {
            path: '',
            component: LstEstadoComponent,
          },
        ],
      },
      {
        path: 'lst-tipoServidor',
        children: [
          {
            path: 'abm/:id',
            component: AbmTipoServidorComponent,
          },
          {
            path: '',
            component: LstTipoServidorComponent,
          },
        ],
      },
      {
        path: 'lst-servidores',
        children: [
          {
            path: 'abm/:id',
            component: AbmServidoresComponent,
          },
          {
            path: '',
            component: LstServidoresComponent,
          },
        ],
      },
      {
        path: 'lst-sistemas',
        children: [
          {
            path: 'abm/:id',
            component: AbmSistemasComponent,
          },
          {
            path: '',
            component: LstSistemasComponent,
          },
        ],
      },
      {
        path: 'lst-entorno',
        children: [
          {
            path: 'abm/:id',
            component: AbmEntornoLenguajeComponent,
          },
          {
            path: '',
            component: LstEntornoLenguajeComponent,
          },
        ],
      },
      {
        path: 'lst-solicitudes',
        children: [
          {
            path: 'abm/:id',
            component: AbmSolicitudSistemasComponent,
          },
          {
            path: '',
            component: LstSolicitudSistemasComponent,
          },
        ],
      },
      
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}