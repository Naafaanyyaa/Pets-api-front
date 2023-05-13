import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'profile/undefined',
    redirectTo: 'profile',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./hello-page/hello-page.module').then(m => m.HelloPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./authentication/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./authentication/registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: 'components',
    loadChildren: () => import('./pages/component-page/component-page.module').then(m => m.ComponentPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/page404/page404.module').then(m => m.Page404Module)
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
