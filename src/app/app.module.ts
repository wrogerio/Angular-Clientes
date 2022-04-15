import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule, Settings } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import {  registerLocaleData } from '@angular/common';
import localePtBr from '@angular/common/locales/br';
registerLocaleData(localePtBr, 'pt-BR');


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ListaComponent } from './components/lista/lista.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { EditarClienteComponent } from './components/editar-cliente/editar-cliente.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RodapeComponent } from './components/rodape/rodape.component';
import { ConfiguracaoComponent } from './components/configuracao/configuracao.component';
import { FlashMessagesModule} from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListaComponent,
    ClientesComponent,
    EditarClienteComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    RodapeComponent,
    ConfiguracaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'clientes'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
