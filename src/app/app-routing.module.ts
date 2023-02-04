import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./hello-page/hello-page.module').then(m => m.HelloPageModule)
  },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./authentication/login/login.module').then(m => m.LoginModule)
  // }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
