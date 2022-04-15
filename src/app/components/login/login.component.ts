import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  senha: string = '';

  constructor(
    private router: Router,
    private flashMessagesService: FlashMessagesService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    })
  }

  login() {
    console.log(this.email, this.senha);
    this.loginService.login(this.email, this.senha).then((res) => {
      this.flashMessagesService.show('Login efetuado com sucesso!', {
        cssClass: 'alert-success',
        timeout: 4000,
      });
      this.router.navigate(['/']);
    }).catch((err) => {
      this.flashMessagesService.show(err.message, {
        cssClass: 'alert-danger',
        timeout: 6000,
      });
      this.router.navigate(['/login']);
    }
    );
  }
}