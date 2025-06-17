import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ModelServiceService } from '../model-service.service';
import { ClienteService } from '../cliente.service'; // ✅ usa ClienteService
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedImage: File | null = null;
  imagePreviewUrl: string | null = null;
  clases: string[] = ['ACA', 'Normal', 'SCC'];
  resultado: any = null;

  pacientes: any[] = [];
  pacienteSeleccionado: number | null = null;

  constructor(
    private modelService: ModelServiceService,
    private clienteService: ClienteService // ✅ aquí usamos ClienteService
  ) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes(): void {
    this.clienteService.obtenerMisPacientes().subscribe({
      next: (data) => {
        this.pacientes = data;
        console.log('Pacientes cargados:', this.pacientes);
      },
      error: (err) => {
        console.error('Error al cargar pacientes:', err);
        Swal.fire('Error', 'No se pudieron cargar los pacientes.', 'error');
      }
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  onPredecir(): void {
    if (!this.selectedImage) {
      Swal.fire({
        icon: 'warning',
        title: 'No hay imagen cargada',
        text: 'Por favor carga una imagen antes de predecir.'
      });
      return;
    }

    this.modelService.predecirImagen(this.selectedImage).subscribe({
      next: (data) => {
        this.resultado = data;
      },
      error: (err) => {
        Swal.fire('Error', 'Ocurrió un error al enviar la imagen al modelo.', 'error');
        console.error(err);
      }
    });
  }
  
  guardarDiagnostico(): void {
  if (!this.pacienteSeleccionado) {
    Swal.fire({
      icon: 'warning',
      title: 'Paciente no seleccionado',
      text: 'Por favor seleccione un paciente antes de guardar el diagnóstico.'
    });
    return;
  }

  if (!this.resultado) {
    Swal.fire({
      icon: 'warning',
      title: 'Sin resultado',
      text: 'Debe realizar una predicción antes de guardar el diagnóstico.'
    });
    return;
  }
  // --- MODIFICACIÓN CLAVE AQUÍ: CONCATENAR LOS DATOS ---
  let resultadoCompletoTexto: string;

  resultadoCompletoTexto = `🔬 Diagnóstico Principal: ${this.resultado.prediccion_clase}\n`;
  resultadoCompletoTexto += `📊Precisión Estimada: ${this.resultado.precision_estimada}%\n`;
  resultadoCompletoTexto += `📊F1-Score Estimado: ${this.resultado.f1_score_estimado}\n`;
  resultadoCompletoTexto += `📈 Probabilidad por Clase\n`;

  for (const clase of this.clases) {
      const porcentaje = this.resultado.porcentajes_por_clase[clase];
      if (porcentaje !== undefined) {
          resultadoCompletoTexto += `- ${clase}: ${porcentaje}%\n`;
      }
  }
  const diagnostico = {
    resultadoModelo: resultadoCompletoTexto,
    anotaciones: 'Sin anotaciones' // o lo que desees por defecto
  };

  this.clienteService.guardarDiagnostico(this.pacienteSeleccionado, diagnostico).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Diagnóstico guardado correctamente',
        timer: 1500,
        showConfirmButton: false
      });
      this.removeImage();
    },
    error: (err) => {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error al guardar diagnóstico',
        text: 'Ocurrió un problema al intentar guardar el diagnóstico.'
      });
    }
  });
}


  removeImage(): void {
    this.selectedImage = null;
    this.imagePreviewUrl = null;
    this.resultado = null;
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  confirmRemoveImage(): void {
    Swal.fire({
      title: '¿Eliminar imagen?',
      text: '¿Estás seguro de que deseas eliminar esta imagen?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeImage();
        Swal.fire({
          icon: 'success',
          title: 'Imagen eliminada',
          showConfirmButton: false,
          timer: 1200
        });
      }
    });
  }
}
