import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigModel } from 'src/app/models/config.model';
import { LoginService } from 'src/app/services/login.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  loggedInUser: string = '';
  canRegister: boolean = false;

  constructor(private loginService: LoginService, private router: Router, private configService: ConfigService) { }

  ngOnInit(): void {
    this.configService.getConfig().subscribe(
      (config: ConfigModel) => {
        this.canRegister = config.permitirRegistro as boolean;
      }
    );
    
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email || '';
      } else {
        this.isLoggedIn = false;
        this.loggedInUser = ''
      }
    });
  }

  logOut(){
    this.loginService.logOut();
    this.isLoggedIn = false;
    this.loggedInUser = '';
    this.router.navigate(['/login']);
  }

}
