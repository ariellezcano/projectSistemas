import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './compartido/principal/principal.component';
import { AbmEstadosComponent } from './frm-abm/abm-estados/abm-estados.component';
import { AbmServidoresComponent } from './frm-abm/abm-servidores/abm-servidores.component';
import { AbmSistemasComponent } from './frm-abm/abm-sistemas/abm-sistemas.component';
import { AbmTipoServidorComponent } from './frm-abm/abm-tipo-servidor/abm-tipo-servidor.component';
import { LstEstadoComponent } from './lst/lst-estado/lst-estado.component';
import { LstServidoresComponent } from './lst/lst-servidores/lst-servidores.component';
import { LstSistemasComponent } from './lst/lst-sistemas/lst-sistemas.component';
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
      
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}