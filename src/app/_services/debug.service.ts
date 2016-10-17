import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DebugService {

  constructor(private http: Http) {

  }

  getResults(url: string, options: RequestOptions): Observable<any> {

    return this.http.get(url, options).map(
      res => {
        console.log("res: " + res);
        console.log("res.json(): " + res.json());
        return res.json()
      }
    ).first();
  }
}
