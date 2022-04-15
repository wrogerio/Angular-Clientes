import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigModel } from 'src/app/models/config.model';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.component.html',
  styleUrls: ['./configuracao.component.css']
})
export class ConfiguracaoComponent implements OnInit {

  permitirRegistro: boolean = false;
  constructor(private router: Router, private configService: ConfigService) { }

  ngOnInit(): void {
    this.configService.getConfig().subscribe(
      (config: ConfigModel) => {
        this.permitirRegistro = config.permitirRegistro as boolean;
      }
    );
  }

  salvar(){
    const config = {permitirRegistro: this.permitirRegistro};
    this.configService.modificarConfig(config);
    this.router.navigate(['/']);
  }
}
