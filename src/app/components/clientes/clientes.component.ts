import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/models/cliente.model';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  cliente: Cliente = {
    nome: '',
    sobrenome: '',
    email: '',
    saldo: 0,
  };
  @ViewChild('clienteForm') clienteForm: NgForm;
  @ViewChild('btFecharModal') btFecharModal: ElementRef;

  constructor(
    private clientesService: ClientesService,
    private flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.clientesService.getClientes().subscribe((res) => {
      this.clientes = res;
    });
  }

  getSaldoTotal(): number {
    let saldoTotal: number = 0;
    return (saldoTotal = this.clientes.reduce((saldo, cliente) => {
      return saldo + cliente.saldo;
    }, 0));
  }

  Adicionar({ value, valid }: NgForm) {
    if (!valid) {
      this.flashMessagesService.show('Preencha todos os campos corretamente', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    }
    else{
      this.clientesService.adicionarCliente(value);
      this.flashMessagesService.show('Cliente adicionado com sucesso', {
        cssClass: 'alert-success',
        timeout: 4000,
      });
      this.clienteForm.resetForm();
      this.fecharModal();
    }
  }

  private fecharModal(){
    this.btFecharModal.nativeElement.click();
  }
}
