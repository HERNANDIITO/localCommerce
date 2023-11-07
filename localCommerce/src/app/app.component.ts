import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  cookies: boolean  = (localStorage.getItem('cookies') === "true");

  hideCookies() {
    localStorage.setItem('cookies', 'true');
    this.cookies = (localStorage.getItem('cookies') === "true");
  }
}
