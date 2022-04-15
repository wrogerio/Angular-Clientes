import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  clientesCollection: AngularFirestoreCollection<Cliente>;
  clienteDoc: AngularFirestoreDocument<Cliente>;
  clientes: Observable<Cliente[]>;
  cliente: Observable<Cliente>;

  constructor(private db: AngularFirestore) {
    this.clientesCollection = this.db.collection('clientes', (ref) =>
      ref.orderBy('nome', 'asc')
    );
  }

  getClientes(): Observable<Cliente[]> {
    this.clientes = this.clientesCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Cliente;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    return this.clientes;
  }

  adicionarCliente(cliente: Cliente) {
    this.clientesCollection.add(cliente);
  }

  editarCliente(cliente: Cliente){
    console.log(cliente);
    debugger;
    this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
    this.clienteDoc.update(cliente);
  }

  getCliente(id: string){
    this.clienteDoc = this.db.doc<Cliente>(`clientes/${id}`);
    this.cliente = this.clienteDoc.snapshotChanges().pipe(
      map((action) => {
        if(action.payload.exists === false){
          return null;
        }else{
          const data = action.payload.data() as Cliente;
          data.id = action.payload.id;
          return data;
        }
      })
    ) as Observable<Cliente>;
    return this.cliente;
  }

  excluirCliente(id: string){
    this.clienteDoc = this.db.doc(`clientes/${id}`);
    this.clienteDoc.delete();
  }
}
