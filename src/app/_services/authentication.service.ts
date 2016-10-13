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
    private millisecondsSinceEpoch;

    constructor(private http: Http) { }

    login(userEmail, userPassword) {
        console.log("about to attempt login for..." + userEmail);
        return this.http.get(this.loginUrl + "?userEmail=" + userEmail + "&userPassword=" + userPassword)
            .map((response: Response) => {
                let loginResponse = response.json();

                console.log("loginResponse.sessionExpiry: " + loginResponse.sessionExpiry);
                console.log("loginResponse.sessionId: " + loginResponse.sessionId);
                console.log("loginResponse.sessionKey: " + loginResponse.sessionKey);
                console.log("loginResponse.userEmail: " + loginResponse.userEmail);
                console.log("millisecondsSinceEpoch: " + this.millisecondsSinceEpoch);
                localStorage.setItem('user-name', userEmail.split('@', 1))
                this.setSessionHeaders(loginResponse);
            })
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    setSessionHeaders(loginResponse) {
        this.millisecondsSinceEpoch = (new Date).getTime().toString();
        localStorage.setItem('hark-auth-session-id', loginResponse.sessionId.toString());
        console.log('hark-auth-session-id:' + localStorage.getItem('hark-auth-session-id'))
        localStorage.setItem('hark-auth-timestamp', this.millisecondsSinceEpoch);
        console.log('hark-auth-timestamp:' + localStorage.getItem('hark-auth-timestamp'))
        localStorage.setItem('session-key', loginResponse.sessionKey.toString());
        console.log('session-key:' + localStorage.getItem('session-key'))
        localStorage.setItem('hark-auth-signature', this.buildAuthSignature(loginResponse));
    }

    buildAuthSignature(loginResponse) {
        let loginResponseInAlphabeticalOrderAsText = "GET\n" +
            "\/accounts\/userId\n" +
            "hark-auth-session-id:" + localStorage.getItem('hark-auth-session-id') + "\n" +
            "hark-auth-timestamp:" + localStorage.getItem('hark-auth-timestamp') + "\n" +
            "\n" +
            "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

        let hashedText = crypto.SHA256(loginResponseInAlphabeticalOrderAsText);
        console.log("hashedText: |" + hashedText + "|");
        console.log('session-key: |' + localStorage.getItem('session-key') + "|");

        let hashedTextWithSessionKeyAsSecret = crypto.HmacSHA256(hashedText.toString(), localStorage.getItem('session-key'));
        console.log("hashedTextWithSessionKeyAsSecret: " + hashedTextWithSessionKeyAsSecret);
        return hashedTextWithSessionKeyAsSecret;
    }

    verifySession(): Observable<boolean> {
        let headers = new Headers({ 'hark-auth-session-id': localStorage.getItem('hark-auth-session-id') });
        headers.append('hark-auth-timestamp', localStorage.getItem('hark-auth-timestamp'));
        headers.append('hark-auth-signature', localStorage.getItem('hark-auth-signature'));
        console.log("headers: " + headers.values())
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.loginCheckUrl, options)
            .map(
            res => {
                let response = res.json();
                if (typeof response === "number") {
                    console.log("res from verify: " + res.json())
                    return true;
                } else {
                    return false;
                }
            }
            ).catch(() => {
                return Observable.of(false);
            });
    }

}