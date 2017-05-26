import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserServiceService {
public baseURI = 'http://localhost:8000/api/';
private body: any;
  constructor(public http: Http) {

  }

  getUsers() {
    return this.http.get(this.baseURI + 'users')
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  getAvailableUsers() {
    return this.http.get(this.baseURI + 'users/available')
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  resetPassword(id) {
    this.body = {
      password: '12345',
    };
    return this.http.put(this.baseURI + 'users/password/' + id, this.body)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  saveUser(body) {
    return this.http.post(this.baseURI + 'users', body)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  updateUser(id) {
    return this.http.get(this.baseURI + 'users', {params: { user : id }})
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  deleteUser(id) {
    // return this.http.delete(this.baseURI + 'users', {params: { user : id }})
    return this.http.delete(this.baseURI + 'users/' + id)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error || 'server error');
  }

}
