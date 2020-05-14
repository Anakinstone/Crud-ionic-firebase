import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import {TiendaI} from '../../models/tienda.interface';
import {ProductoService} from '../../services/producto.service';


@Component({
  selector: 'app-producto-details',
  templateUrl: './producto-details.page.html',
  styleUrls: ['./producto-details.page.scss'],
})

export class ProductoDetailsPage implements OnInit {

  producto: TiendaI = {
    nombre: '',
    cantidad: 1,
    precio: 0,
    ganancia: 0,
    voluntario: '',
  };

  productoId = null;

  constructor(private route: ActivatedRoute, private nav: NavController,
              private productoService: ProductoService,
              private loadingController: LoadingController) { }
  ngOnInit() {
    this.productoId = this.route.snapshot.params['id'];
    if (this.productoId) {
      this.loadProducto();
    }
    function suma(a: number, b: number): number {
     return a + b;
    }
  }
  async loadProducto() {
    const loading = await this.loadingController.create({
      message: 'Loading....'
    });
    await loading.present();

    this.productoService.getProducto(this.productoId).subscribe(producto => {
      loading.dismiss();
      this.producto = producto;
    });
  }

  async saveProducto() {
    const loading = await this.loadingController.create({
      message: 'Saving....'
    });
    await loading.present();

    if (this.productoId) {
      this.productoService.updateProducto(this.producto, this.productoId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    } else {
      this.productoService.addProducto(this.producto).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    }
  }
  async onRemoveProducto(idProducto: string) {
    this.productoService.removeProducto(idProducto);
  }
}
