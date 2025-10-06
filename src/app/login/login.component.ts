import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private loginService: LoginServiceService,
    private router: Router
  ) {}

  iniciarSesion() {
    this.loginService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        this.loginService.saveToken(response.accessToken);

        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/app/Inicio']);
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Credenciales incorrectas',
          text: 'Verifica tu correo y contraseña.'
        });
      }
    });
  }
}
