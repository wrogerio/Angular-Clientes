import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/models/cliente.model';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css'],
})
export class EditarClienteComponent implements OnInit {
  cliente: Cliente = {
    nome: '',
    sobrenome: '',
    email: '',
    saldo: 0,
  };

  id: string = '';

  constructor(
    private clientesService: ClientesService,
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.clientesService.getCliente(this.id).subscribe((cliente) => {
      this.cliente = cliente;
    });
  }

  editar({ value, valid }: NgForm) {
    if (!valid) {
      this.flashMessagesService.show('Preencha todos os campos corretamente', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    } else {
      value.id = this.id;
      this.clientesService.editarCliente(value);
      this.router.navigate(['/']);
    }
  }

  excluir() {
    if (confirm('Deseja realmente excluir este cliente?')) {
      this.clientesService.excluirCliente(this.id);
      this.flashMessagesService.show('Cliente excluído com sucesso', {
        cssClass: 'alert-success',
        timeout: 4000,
      });
      this.router.navigate(['/']);
    }
  }
}
