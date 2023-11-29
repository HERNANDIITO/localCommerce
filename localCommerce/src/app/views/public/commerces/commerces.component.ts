import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommerceInterface } from 'src/app/interfaces/commerce.interfaces';
import { CommerceService } from 'src/app/services/commerce.service';

@Component({
  selector: 'lc-commerces',
  templateUrl: './commerces.component.html',
  styleUrls: ['./commerces.component.scss']
})
export class CommercesComponent implements OnInit, OnDestroy {

  commerces!: CommerceInterface[];
  commerceSubscription?: Subscription

  constructor( private commerceService: CommerceService ) {}

  ngOnInit() {
    this.commerceSubscription = this.commerceService.getCommerces().subscribe( data => {
      this.commerces = data as CommerceInterface[];
    })
  }

  ngOnDestroy() {
    this.commerceSubscription?.unsubscribe();
  }
}
