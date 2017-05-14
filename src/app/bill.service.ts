import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class BillService {

  constructor(public http: Http) { }

  getBills(){
    return this.http.get('http://localhost:8000/api/bills')
      .map((response: Response) => response.json())
      .catch(BillService.errorHandler);
  }

  getMoreResults(url){
    console.log('making req to:' + url );
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(BillService.errorHandler);
  }

  private static errorHandler(error: Response){
    console.log(error);
    return Observable.throw(error || "server error");
  }
}
