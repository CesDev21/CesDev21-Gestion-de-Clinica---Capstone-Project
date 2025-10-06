import { Component } from '@angular/core';

interface SideNavToggle {
  screenwidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proyectoprueba';
  isLoggedIn = false;
  isSideNavCollapsed = false;
  screenWidth = 0;

  handleLoginSuccess() {
    this.isLoggedIn = true;
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenwidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
