import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:8080/api/pacientes';

  constructor(private http: HttpClient) {}

  obtenerMisPacientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mis-pacientes`);
  }

  obtenerPacientePorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  registrarPaciente(paciente: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, paciente);
  }

  obtenerPacientesDelDoctor(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/doctor`);
  }

  actualizarPaciente(id: number, paciente: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, paciente);
  }

  eliminarPaciente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  guardarDiagnostico(pacienteId: number, diagnostico: any): Observable<any> {
  const url = `${this.apiUrl}/${pacienteId}/diagnosticos`;
  return this.http.post<any>(url, diagnostico);
  }



  obtenerHistorialDiagnostico(pacienteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${pacienteId}/diagnosticos`);
  }

  guardarAnotacion(diagnostico: any): Observable<any> {
    const pacienteId = diagnostico.paciente.id;
    const diagnosticoId = diagnostico.id;
    const url = `${this.apiUrl}/${pacienteId}/diagnosticos/${diagnosticoId}/anotaciones`;
    return this.http.patch(url, diagnostico.anotaciones, {
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}