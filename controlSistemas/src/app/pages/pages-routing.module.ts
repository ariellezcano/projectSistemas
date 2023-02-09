import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LstEstadoComponent } from './lst/lst-estado/lst-estado.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
    //   {
    //     path: '',
    //     //component: PantallaPrincipalComponent,
    //   },
      {
        path: 'lst-estados',
        children: [
          // {
          //   path: 'abm/:id',
          //   component: AbmDepartamentoComponent,
          // },
          {
            path: '',
            component: LstEstadoComponent,
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