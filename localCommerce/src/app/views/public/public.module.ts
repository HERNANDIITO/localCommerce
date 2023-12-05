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
import { CommercesComponent } from './commerces/commerces.component';
import { TicketComponent } from './commerces/ticket/ticket.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    PublicComponent,
    LandingComponent,
    JoinUsComponent,
    HelpComponent,
    SupportComponent,
    CommercesComponent,
    TicketComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgbDropdownModule
  ]
})
export class PublicModule { }
