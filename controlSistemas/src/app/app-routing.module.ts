import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './pages/compartido/principal/principal.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [

  {
    path: '',
    component: PrincipalComponent,
  },

  // {
  //   path: 'principal',
  //   loadChildren: () =>
  //     import('./pages/pages-routing.module').then((m) => m.PagesRoutingModule),
  // },
  // {
  //   path: '',
  //   redirectTo: 'principal',
  //   pathMatch: 'full',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
