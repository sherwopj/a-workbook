import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services/index'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authenticationService: AuthenticationService, private alertService: AlertService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let sessionIsValid = false;


        return this.authenticationService.verifySession().map(sessionIsValid => {
            if (sessionIsValid) {

                console.log("next: " + next.url);
                console.log("sessionIsValid: " + sessionIsValid.valueOf());
                return true;
            } else {
                console.log("else sessionIsValid: " + sessionIsValid.valueOf());
                this.router.navigate(['/login']);
            }
        }, error => {
            console.log("error while verifying session: " + error);
            this.router.navigate(['/login']);
        }
        ).catch(() => {
            this.router.navigate(['/login']);
            return Observable.of(false);
        })

        // return this.authenticationService.verifySession().map(
        //     response => {
        //         sessionIsValid = true;
        //         console.log("next: " + next.url);
        //         return true;
        //     },
        //     error => {
        //         console.log("error while verifying session: " + error);
        //         sessionIsValid = false;
        //         this.alertService.error(error);

        //     }
        // ).catch(() => {
        //     this.router.navigate(['/login']);
        //     return Observable.of(false)
        // })

        // if (this.authenticationService.verifySession()) {
        //     console.log("next: " + next.url);
        //     return Observable.of(true);
        // } else {
        //     this.router.navigate(['/login']);
        //     return Observable.of(false);
        // }

    }
}