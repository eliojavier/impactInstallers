import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ReportsServiceService {
  public baseURI = 'http://localhost:8000/api/';
  private body: any;
  constructor(public http: Http) {

  }

  getRankingLocations() {
    return this.http.get(this.baseURI + 'reports/rankingLocations')
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  getRankingInstallers() {
    return this.http.get(this.baseURI + 'reports/rankingInstallers')
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  getRankingCommissions(body) {
    return this.http.get(this.baseURI + 'reports/rankingCommissions/'+body.month+'/'+body.year)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  getQuantityServices(body) {
    return this.http.get(this.baseURI + 'reports/quantityServices/'+body.month+'/'+body.year)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error || 'server error');
  }

}
