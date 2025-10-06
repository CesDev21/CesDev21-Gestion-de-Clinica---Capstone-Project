import { Component } from '@angular/core';

interface SideNavToggle {
  screenwidth: number;
  collapsed: boolean;
}


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
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
