import { Component, OnInit } from '@angular/core';
import {TiendaI} from '../models/tienda.interface';
import {ProductoService} from '../services/producto.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  productos: TiendaI[];
  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.productoService.getProductos().subscribe((productos) => {
      console.log('Productoss', productos);
      this.productos = productos;
    });
  }
  remove(idProducto: string) {
    this.productoService.removeProducto(idProducto);
  }
}
