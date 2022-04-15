import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string = '';
  senha: string = '';

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  register(){
    this.loginService.register(this.email, this.senha).then(
      res => {
        this.router.navigate(['/']);
      }
    ).catch(err => alert('Erro ao cadastrar usuário'))

  }
}
