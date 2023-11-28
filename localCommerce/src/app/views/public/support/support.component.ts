import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lc-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent {
send() {
throw new Error('Method not implemented.');
}
  supportForm = new FormGroup({
    name:  new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    tlf:   new FormControl(null, Validators.required),
    msg:   new FormControl(null, Validators.required)
  });
}
