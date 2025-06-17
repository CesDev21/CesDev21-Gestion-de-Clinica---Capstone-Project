import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) { }

  onLogin(): void {
    if (this.email === 'admin' && this.password === 'admin') {
      localStorage.setItem('isLoggedIn', 'true'); // Marca sesión activa
      this.router.navigate(['/Inicio']); // Redirige al layout principal
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
