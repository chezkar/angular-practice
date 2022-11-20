import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interfaces'

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise( (resolve, reject) => {
      this.http.get('https://angular-html-c08d5-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe( (resp: any) => {
          this.productos = resp;
          this.cargando = false;
          // resolve();
        });
    });
  }

  getProducto( id: string ){
    return this.http.get(`https://angular-html-c08d5-default-rtdb.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string ){
    if (this.productos.length === 0){
      this.cargarProductos().then( () => {
        this.filtarProductos( termino );
      });
    }else{
      this.filtarProductos( termino );
    }
  }

  private filtarProductos( termino: string ){
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();

      if( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0   ){
        this.productosFiltrado.push(prod);
      }
    })
  }
}
