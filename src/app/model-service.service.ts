import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModelServiceService {
  private apiUrl = 'http://127.0.0.1:5000/predict';

  constructor(private http: HttpClient) { }

  predecirImagen(imagen: File) {
    const formData = new FormData();
    formData.append('image', imagen);

    return this.http.post<any>(this.apiUrl, formData);
  }
}
