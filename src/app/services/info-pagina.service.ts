import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interfaces';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  equipo: any[] = [];

  constructor( private http: HttpClient ) {
    // console.log('Servicio activo')
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo(){
    //leer archivo info
    this.http.get('assets/data/data-pagina.json')
      .subscribe(
          (resp: InfoPagina) => {
            this.cargada = true;
            this.info = resp;
          }
      );
  }

  private cargarEquipo(){
    //leer archivo equpo
    this.http.get('https://angular-html-c08d5-default-rtdb.firebaseio.com/equipo.json')
      .subscribe(
          (resp: any) => {
            this.cargada = true;
            this.equipo = resp;
            console.log(resp);
          }
      );
  }
}
