import { Component, OnInit } from '@angular/core';
import * as crypto from 'crypto-js';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { DebugService } from '../_services/debug.service'
import { Parameter } from '../parameter'

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css'],
})

export class DebugComponent implements OnInit {
  private sessionExpiry: string;
  private sessionId: string;
  private sessionKey: string;
  private userEmail: string;
  private apiEndpoint: string;
  private parameterKey: string;
  private parameterValue: string;

  private httpMethod: string;
  private host: string;
  private harkAuthSessionId: string;
  private harkAuthTimestamp: string;
  private mymodel: any = "";
  private signaturePayload: any = [];
  private parameters: Parameter[] = [];
  private results: string;
  private errorMessage: string;
  private methods: any;
  private selectedMethod;

  constructor(private debugService: DebugService) {

    this.methods = [
      { name: 'GET', value: 'GET', disabled: false },
      { name: 'PUT', value: 'PUT', disabled: false },
      { name: 'POST', value: 'POST', disabled: false },
    ];
    this.selectedMethod = this.methods[0];

  }

  ngOnInit() {
    this.updateHarkAuthTimeout();
    this.httpMethod = 'get';
    this.sessionExpiry = localStorage.getItem('sessionExpiry');
    this.harkAuthSessionId = localStorage.getItem('sessionId');
    this.sessionKey = localStorage.getItem('sessionKey');
    this.userEmail = localStorage.getItem('userEmail');
    this.apiEndpoint = '/accounts/userId';
    this.host = 'https://api.beta.ahub.harksolutions.net';
    this.signaturePayload[0] = 'GET';
    this.signaturePayload[1] = this.apiEndpoint;
    this.signaturePayload[2] = 'hark-auth-session-id:' + this.harkAuthSessionId;
    this.signaturePayload[3] = 'hark-auth-timestamp:' + this.harkAuthTimestamp;
    this.signaturePayload[4] = '';
    this.jsonPayloadValue = "";
    this.results = "";
  }

  private updateHarkAuthTimeout() {
    console.log('timestamp updated: ');
    this.harkAuthTimestamp = (new Date).getTime().toString();
    this.signaturePayload[3] = 'hark-auth-timestamp:' + this.harkAuthTimestamp;
  }

  private setHttpMethod(value: any) {
    console.log('Selected value is: ', value.name);
    this.httpMethod = value.name.toString().toLowerCase();
    this.signaturePayload[0] = value.name;
  }

  private updateEndpoint(value: string) {
    console.log("Endpoint: ", value);
    this.signaturePayload[1] = value;
  }

  addParameter(value: string) {
    console.log("parameterKey: " + this.parameterKey)
    console.log("parameterValue: " + this.parameterValue)
    let parameter = new Parameter(this.parameterKey, this.parameterValue);
    this.parameters.push(parameter);
  }

  get signaturePayloadValue() {
    return this.signaturePayload.join('\n');
  }

  set signaturePayloadValue(signaturePayload) {
    console.log("should change generated signature!")
  }

  set jsonPayloadValue(jsonPayload) {
    //If we want to validate the input JSON
    // try {
    //   jsonPayload = JSON.parse(v);
    //   console.log(jsonPayload);
    // }
    // catch (e) {
    //   console.log('error occored while you were typing the JSON');
    // };
    let hashedJsonPayload = crypto.SHA256(jsonPayload).toString()
    console.log(hashedJsonPayload);
    this.signaturePayload[5] = hashedJsonPayload;
  }

  get harkAuthSignature() {
    let hashedText = crypto.SHA256(this.signaturePayloadValue);
    return crypto.HmacSHA256(hashedText.toString(), localStorage.getItem('session-key'));
  }

  sendIt() {
    //update the timestamp just before making call
    //this.updateHarkAuthTimeout();

    // this.results = "";
    let url = this.host + this.apiEndpoint;
    console.log("url: " + url);

    let body = JSON.stringify(this.jsonPayloadValue);

    let headers = new Headers({ 'hark-auth-session-id': this.harkAuthSessionId });
    headers.append('hark-auth-timestamp', this.harkAuthTimestamp);
    headers.append('hark-auth-signature', this.harkAuthSignature);
    headers.append('content-type', 'application/json');
    console.log("headers: " + headers.values())
    let options = new RequestOptions({ headers: headers });


    switch (this.httpMethod) {
      case 'get':
        this.debugService.get(url, options)
          .subscribe(
          res => this.results = res,
          error => this.errorMessage = <any>error
          );
        break;
      case 'put':
        this.debugService.put(url, body, options).subscribe(res => this.results = res);
        break;
      case 'post':
        this.debugService.post(url, body, options).subscribe(res => this.results = res);
        break;
    }

    console.log("results: " + this.errorMessage);
  }

}
