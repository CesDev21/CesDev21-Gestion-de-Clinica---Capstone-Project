import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { navbarData } from './nav-data';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

interface SideNavToggle {
  screenwidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  navbarDataWithoutLogout = [];
  navbarLogout = [];

  constructor(private router: Router) {}

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenwidth = 0;
  navData = navbarData;

  ngOnInit(): void {
    this.screenwidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize($event: any) {
    this.screenwidth = window.innerWidth;
    if (this.screenwidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenwidth: this.screenwidth
      })
    }
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenwidth: this.screenwidth })
  }
  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenwidth: this.screenwidth })
  }

   onLogoutClick(): void {
    Swal.fire({
      title: '¿Deseas abandonar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        localStorage.removeItem('isLoggedIn'); // Limpia sesión si usas esta lógica
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
