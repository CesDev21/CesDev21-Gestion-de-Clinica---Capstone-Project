import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-passwd',
  templateUrl: './change-passwd.component.html',
  styleUrls: ['./change-passwd.component.scss']
})
export class ChangePasswdComponent {
  constructor(private router: Router) { }

  cancelar(): void {
    Swal.fire({
      title: 'Redirigiendo...',
      icon: 'info',
      timer: 1500,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    }).then(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}
