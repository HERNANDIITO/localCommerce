import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommerceService } from 'src/app/services/commerce.service';

@Component({
  selector: 'app-commerce-component',
  templateUrl: './commerce-component.component.html',
  styleUrls: ['./commerce-component.component.scss']
})
export class CommerceComponentComponent implements OnInit, OnDestroy{

  commerceSubscription?: Subscription;

  constructor ( private commerceService: CommerceService ) {}
  
  
  ngOnInit(): void {
    this.commerceSubscription = this.commerceService.getCommerces().subscribe( data => {
      console.log("data: ", data);
    });
  }

  ngOnDestroy(): void {
    this.commerceSubscription?.unsubscribe();
  }

}
