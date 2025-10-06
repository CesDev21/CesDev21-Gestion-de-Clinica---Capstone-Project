import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { navbarData } from '../sidenav/nav-data';
import { ClienteService } from '../cliente.service';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';

export interface SideNavToggle {
  screenwidth: number;
  collapsed: boolean;
}

export interface Paciente {
  id?: number;
  codigo: string;
  nombre: string;
  apellido: string;
  dni: string;
  correo: string;
  telefono: string;
  edad: number | null;
  genero: string;
}

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = true;
  sceenWidth = 0;
  navData = navbarData;

  public data: Paciente[] = [];
  public registro: Paciente = {
    codigo: '',
    nombre: '',
    apellido: '',
    dni: '',
    correo: '',
    telefono: '',
    edad: null,
    genero: ''
  };

  private modal: Modal | null = null;
  private modalEditar: Modal | null = null;
  private historialModal: Modal | null = null;

  public pacienteSeleccionado: Paciente | null = null;
  public esEdicion: boolean = false;
  public historial: any[] = [];

  constructor(private pacienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.ListarPacientes();

    const modalElement = document.getElementById('pacienteModal');
    if (modalElement) {
      this.modal = new Modal(modalElement);
    }

    const modalEditarElement = document.getElementById('editarPacienteModal');
    if (modalEditarElement) {
      this.modalEditar = new Modal(modalEditarElement);
    }

    const historialElement = document.getElementById('historialModal');
    if (historialElement) {
      this.historialModal = new Modal(historialElement);
    }
  }

  abrirModal(): void {
    this.modal?.show();
    this.quitarBackdrop();
  }

  cerrarModal(): void {
    this.modal?.hide();
  }

  abrirModalEditar(paciente: Paciente): void {
    this.pacienteSeleccionado = { ...paciente };
    this.esEdicion = true;
    this.modalEditar?.show();
    this.quitarBackdrop();
  }

  cerrarModalEditar(): void {
    this.modalEditar?.hide();
    this.esEdicion = false;
    this.pacienteSeleccionado = null;
  }

  actualizarPaciente(valido: boolean): void {
  if (!valido || !this.pacienteSeleccionado?.id) return;

  this.pacienteService.actualizarPaciente(this.pacienteSeleccionado.id, this.pacienteSeleccionado).subscribe({
    next: () => {
      this.ListarPacientes();
      this.cerrarModalEditar();
      Swal.fire({ // Alerta de éxito al actualizar
          icon: 'success',
          title: '¡Actualizado!',
          text: 'El paciente ha sido actualizado correctamente.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });
    },
    error: (err) => {
      console.error('Error al actualizar paciente:', err);
      Swal.fire({ // Alerta de error al actualizar
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al actualizar el paciente. Inténtalo de nuevo.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Ok'
        });
    }
  });
}


  abrirHistorialModal(pacienteId: number): void {
  this.pacienteService.obtenerHistorialDiagnostico(pacienteId).subscribe({
    next: (data) => {
      // Ordenar por fecha descendente
      const historialOrdenado = data.sort(
        (a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      );

      // Marcar solo el diagnóstico más reciente como editable
      historialOrdenado.forEach((d: any, index: number) => {
        d.esEditable = index === 0;
      });

      this.historial = historialOrdenado;
      this.historialModal?.show();
      this.quitarBackdrop();
    },
    error: (err) => {
      console.error('Error al obtener historial:', err);
      this.historial = [];
      this.historialModal?.show();
    }
  });
}


  cerrarHistorialModal(): void {
    this.historialModal?.hide();
  }

  guardarAnotacion(diagnostico: any): void {
  if (!diagnostico || !diagnostico.anotaciones) return;

  this.pacienteService.guardarAnotacion(diagnostico).subscribe({
    next: () => {
      console.log('✅ Anotación actualizada correctamente');
    },
    error: (err) => {
      console.error('❌ Error al actualizar anotación:', err);
    }
  });
}



  getDiagnosticoMasReciente(): any {
  if (!this.historial || this.historial.length === 0) return null;

  return this.historial.reduce((reciente, actual) => {
    const fechaReciente = new Date(reciente.fechaDiagnostico);
    const fechaActual = new Date(actual.fechaDiagnostico);
    return fechaActual > fechaReciente ? actual : reciente;
  });
}

  eliminarPaciente(id: number): void {
    Swal.fire({ // Alerta de confirmación para eliminar
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pacienteService.eliminarPaciente(id).subscribe({
          next: () => {
            this.ListarPacientes();
            Swal.fire( // Alerta de éxito al eliminar
              '¡Eliminado!',
              'El paciente ha sido eliminado.',
              'success'
            );
          },
          error: (err) => {
            console.error('Error al eliminar paciente:', err);
            Swal.fire( // Alerta de error al eliminar
              'Error',
              'Hubo un problema al eliminar el paciente. Inténtalo de nuevo.',
              'error'
            );
          }
        });
      }
    });
  }

  GuardarPaciente(valido: boolean, paciente: Paciente): void {
    if (!valido) {
      Swal.fire({ // Alerta si el formulario no es válido al guardar
        icon: 'error',
        title: 'Error de validación',
        text: 'Por favor, completa todos los campos requeridos.',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Ok'
      });
      return;
    }

    this.pacienteService.registrarPaciente(paciente).subscribe({
      next: () => {
        this.ListarPacientes();
        this.cerrarModal();
        this.limpiarFormulario();
        Swal.fire({ // Alerta de éxito al guardar
          icon: 'success',
          title: '¡Guardado!',
          text: 'El paciente ha sido registrado correctamente.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });
      },
      error: (err) => {
        console.error('Error al registrar paciente:', err);
        Swal.fire({ // Alerta de error al guardar
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al registrar el paciente. Inténtalo de nuevo.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  ListarPacientes(): void {
    this.pacienteService.obtenerMisPacientes().subscribe({
      next: (data) => {
        this.data = data;
      },
      error: () => {
        console.log('Error al obtener pacientes');
      },
      complete: () => {
        console.log('Servicio completado');
      }
    });
  }

  limpiarFormulario(): void {
    this.registro = {
      codigo: '',
      nombre: '',
      apellido: '',
      dni: '',
      correo: '',
      telefono: '',
      edad: null,
      genero: ''
    };
  }

  private quitarBackdrop(): void {
    setTimeout(() => {
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.remove();
    }, 100);
  }
}
