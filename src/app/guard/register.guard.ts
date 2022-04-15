import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { ConfigService } from '../services/config.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterGuard implements CanActivate {
  constructor(private configService: ConfigService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.configService.getConfig().pipe(
      map((config) => {
        if (config.permitirRegistro) {
          return true;
        } else {
          this.router.navigate(['/not-found']);
          return false;
        }
      })
    );
  }
}
