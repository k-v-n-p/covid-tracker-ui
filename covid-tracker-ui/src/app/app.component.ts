import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'covid-tracker-ui';

  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  opened = true;

  toggleSidenav() {
    this.opened = !this.opened;
    this.sidenav.toggle();
  }
  }
  
