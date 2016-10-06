import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.userEmail, this.model.userPassword)
            .subscribe(
                data => {
                    this.router.navigate(['/']);
                    this.alertService.success('Log in successful', true);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
         //confirm returned token is good
                
    }
}