import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Puesto } from '../puestos';
import { map } from 'rxjs/operators';
import { ItemTemplateDirective } from '@progress/kendo-angular-dropdowns';

const localUrl = 'http://localhost:3000/posts';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getData(): Observable<Puesto[]> {
    return this.http.get(localUrl).pipe(
      map((data: Puesto[]) =>
        data.map(
          (item: Puesto) =>
            new Puesto(item.id, item.puestoId, item.puestoIdOficial, item.tipoVinculo, item.puestoTipo,
              item.catalogo, item.adscripcion, item.grupo1Id, item.grupo2Id, item.escala,
              item.disponibilidadPlena, new Date(item.fechaVigenciaInicio))
        )
      )
    );
  }

  postData(item: Puesto): Observable<Puesto> {
    return this.http.post<Puesto>(localUrl, item);
  }

  putData(id: number, item: Puesto): Observable<Puesto> {
    const url = `${localUrl}/${id}`
    return this.http.put<Puesto>(url, item);
  }

  removeData(item: Puesto): Observable<Puesto> {
    const url = `${localUrl}/${item.id}`
    return this.http.delete<Puesto>(url);
  }

}
