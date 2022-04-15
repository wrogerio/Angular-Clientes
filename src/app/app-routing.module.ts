import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaComponent } from './components/lista/lista.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EditarClienteComponent } from './components/editar-cliente/editar-cliente.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ConfiguracaoComponent } from './components/configuracao/configuracao.component';
import { AuthGuard } from './guard/auth.guard';
import { RegisterGuard } from './guard/register.guard';

const routes: Routes = [
  { path: '', component: ListaComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [RegisterGuard] },
  { path: 'config', component: ConfiguracaoComponent, canActivate: [AuthGuard] },
  { path: 'cliente/editar/:id', component: EditarClienteComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
