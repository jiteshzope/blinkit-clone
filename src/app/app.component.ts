import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blinkit-clone';

  displayData: any;

  constructor() {
    console.log('AppComponent initialized');
  }
}
