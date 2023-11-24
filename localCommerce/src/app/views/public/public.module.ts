import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { LandingComponent } from './landing/landing.component';
import { JoinUsComponent } from './join-us/join-us.component';
import { HelpComponent } from './help/help.component';
import { SupportComponent } from './support/support.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PublicComponent,
    LandingComponent,
    JoinUsComponent,
    HelpComponent,
    SupportComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PublicModule { }
