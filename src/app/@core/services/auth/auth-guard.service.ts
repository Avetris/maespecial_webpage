import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(public authService: AuthService, public router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
        var self = this;
        return this.authService.isAuth()
            .then((res) => { 
                if (res == true) return true; 
                else {
                    self.router.navigateByUrl('/admin/login'); 
                    return false;
                }
            });
    }
}