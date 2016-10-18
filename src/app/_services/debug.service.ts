import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DebugService {

  constructor(private http: Http) {

  }

  get(url: string, options: RequestOptions): Observable<any> {

    return this.http.get(url, options).map(
      res => {
        console.log("get res: " + res);
        console.log("res.json(): " + res.json());
        return res.json()
      }
    ).first().catch(this.handleError);
  }

  put(url: string, body: string, options: RequestOptions): Observable<any> {

    return this.http.put(url, body, options).map(
      res => {
        console.log("put res: " + res);
        console.log("res.json(): " + res.json());
        return res.json()
      }
    ).first();
  }

  post(url: string, body: string, options: RequestOptions): Observable<any> {

    return this.http.post(url, body, options).map(
      res => {
        console.log("post res: " + res);
        console.log("res.json(): " + res.json());
        return res.json()
      }
    ).first();
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    // let errMsg = (error.message) ? error.message :
    //   error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    // console.error('errMsg: ' + error); // log to console instead
    return Observable.throw(error);
  }
}
