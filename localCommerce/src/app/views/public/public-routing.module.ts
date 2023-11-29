//leaves-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { LandingComponent } from './landing/landing.component';
import { HelpComponent } from './help/help.component';
import { SupportComponent } from './support/support.component';
import { JoinUsComponent } from './join-us/join-us.component';
import { CommercesComponent } from './commerces/commerces.component';


const routes: Routes = [
  {
    path: '', component: PublicComponent, children: [
      {
        path: '', component: LandingComponent
      },
      {
        path: 'support', component: SupportComponent
      },
      {
        path: 'join-us', component: JoinUsComponent
      },
      {
        path: 'help', component: HelpComponent
      },
      {
        path: 'commerces', component: CommercesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }