import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [

  {
    path: '',
    component: PagesComponent,
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
