import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

    private loginUrl = "https://api.beta.ahub.harksolutions.net/accounts/user/session/credentials";

    constructor(private http: Http) { }

    login(userEmail, userPassword) {
        console.log("about to attempt login for..."+userEmail);
        return this.http.get(this.loginUrl + "?userEmail=" + userEmail + "&userPassword=" + userEmail)
            .map((response: Response) => {
                let loginResponse = response.json();
                console.log("loginResponse.sessionExpiry: "+loginResponse.sessionExpiry);
                console.log("loginResponse.sessionId: "+loginResponse.sessionId);
                console.log("loginResponse.sessionKey: "+loginResponse.sessionKey);
                console.log("loginResponse.userEmail: "+loginResponse.userEmail);
                
                if (loginResponse && loginResponse.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(loginResponse));
                }
                throw(Error); 
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}