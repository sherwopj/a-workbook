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
        let sessionResponse;
        this.loading = true;
        this.authenticationService.login(this.model.userEmail, this.model.userPassword)
            .subscribe(
            response => {
                console.log("got a response from 1st call!");
                this.router.navigate(["/"]);
            },
            error => {
                console.log("error while attempting to login: " + error);
                this.alertService.error(error);
                this.loading = false;
            });
    }
}