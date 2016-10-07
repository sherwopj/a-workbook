import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as crypto from 'crypto-js';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {

    private loginUrl = "https://api.beta.ahub.harksolutions.net/accounts/user/session/credentials";
    private loginCheckUrl = "https://api.beta.ahub.harksolutions.net/accounts/userId";
    private loginResponse;
    constructor(private http: Http) { }

    login(userEmail, userPassword) {
        console.log("about to attempt login for..."+userEmail);
        return this.http.get(this.loginUrl + "?userEmail=" + userEmail + "&userPassword=" + userPassword)
            .map((response: Response) => {
                this.loginResponse = response.json();
                console.log("loginResponse.sessionExpiry: "+this.loginResponse.sessionExpiry);
                console.log("loginResponse.sessionId: "+this.loginResponse.sessionId);
                console.log("loginResponse.sessionKey: "+this.loginResponse.sessionKey);
                console.log("loginResponse.userEmail: "+this.loginResponse.userEmail);
                
                // if(this.verifySession(loginResponse)){
                //     console.log("SESSION VERIFIED!")
                // }
                // if (loginResponse && loginResponse.token) {
                //     // store user details and jwt token in local storage to keep user logged in between page refreshes
                //     localStorage.setItem('currentUser', JSON.stringify(loginResponse));
                // }
                //throw(Error); 
            }).flatMap((this.loginResponse) => this.http.get(this.loginCheckUrl,options)
            .map((response: Response) => {
                console.log("£££££££££££££££££££££££££££££");
                let verifyResult = response.json();
                console.log("verifyResult: "+verifyResult.toString());
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    verifySession(loginResponse) {
        var millisecondsSinceEpoch = (new Date).getTime();
        let loginResponseInAlphabeticalOrderAsText = "GET\n"+
                                                     "\/accounts\/userId\n"+
                                                     "hark-auth-session-id:"+loginResponse.sessionId +"\n"+
                                                     "hark-auth-timestamp:"+millisecondsSinceEpoch +"\n"+
                                                     "\n"+
                                                     "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

        let hashedText = crypto.HmacSHA256(loginResponseInAlphabeticalOrderAsText,loginResponse.sessionKey.toString());
        console.log("hashedText: "+hashedText);
        let hashedTextWithSessionKeyAsSecret = crypto.HmacSHA256(hashedText, loginResponse.sessionKey);
        console.log("hashedTextWithSessionKeyAsSecret: "+hashedTextWithSessionKeyAsSecret);

        let headers = new Headers({ 'hark-auth-session-id': loginResponse.sessionId.toString() });
        headers.append('hark-auth-timestamp', millisecondsSinceEpoch.toString());
        headers.append('hark-auth-signature', hashedTextWithSessionKeyAsSecret.toString());

        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.loginCheckUrl,options)
            .map((response: Response) => {
                console.log("£££££££££££££££££££££££££££££");
                let verifyResult = response.json();
                console.log("verifyResult: "+verifyResult.toString());
            });


    }

    private handleError (error: any) {

    }
}