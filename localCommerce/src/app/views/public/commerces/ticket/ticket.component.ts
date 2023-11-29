import { Component, Input } from '@angular/core';
import { CommerceInterface } from 'src/app/interfaces/commerce.interfaces';

@Component({
  selector: 'lc-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent {
  @Input() commerce!: CommerceInterface;

}
