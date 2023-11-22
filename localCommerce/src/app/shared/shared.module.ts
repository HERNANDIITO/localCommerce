import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MapComponent } from './map/map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { ToastComponent } from './toast/toast.component';



@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    MapComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    MapComponent,

  ]
})
export class SharedModule { }
