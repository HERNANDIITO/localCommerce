import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./views/public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'user', loadChildren: () => import('./views/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'commerce', loadChildren: () => import('./views/commerce/commerce.module').then(m => m.CommerceModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
