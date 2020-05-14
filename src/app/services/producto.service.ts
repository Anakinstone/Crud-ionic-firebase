import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { TiendaI} from '../models/tienda.interface';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productosCollection: AngularFirestoreCollection<TiendaI>;
  private productos: Observable<TiendaI[]>;


  constructor(db: AngularFirestore) {
    this.productosCollection = db.collection<TiendaI>('productos');
    // @ts-ignore
    this.productos = this.productosCollection.snapshotChanges().pipe(map(
        actions => {
            return actions.map(a => {
            const data = a.payload.doc.data( );
            const id = a.payload.doc.id;
            return {id, ... data };
          });
        }
    ));
  }
  getProductos() {
     return this.productos;
  }
  getProducto(id: string) {
    return this.productosCollection.doc<TiendaI>(id).valueChanges();
  }
  updateProducto(producto: TiendaI, id: string) {
    return this.productosCollection.doc(id).update(producto);
  }
  addProducto(producto: TiendaI) {
    return this.productosCollection.add(producto);
  }
  removeProducto(id: string) {
    return this.productosCollection.doc(id).delete();
  }
}

