import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    //   {
    //     path: 'lst-departamento',
    //     children: [
    //       {
    //         path: 'abm/:id',
    //         component: AbmDepartamentoComponent,
    //       },
    //       {
    //         path: '',
    //         component: LstDepartamentoComponent,
    //       },
    //     ],
    //   },
      
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}