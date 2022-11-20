import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion.interfaces';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  producto!: ProductoDescripcion;
  id!: string;

  constructor( private route:ActivatedRoute, public productoService: ProductosService  ){

  }

  ngOnInit(){
    this.route.params
      .subscribe( parametros => {
        this.productoService.getProducto(parametros['id'])
          .subscribe( (producto: any) => {
              this.producto = producto;
              this.id = parametros['id'];
          } );
      });
  }
}
