import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserServiceService {
  public baseURI = 'http://localhost:8000/api/';
  private body: any;
  auth_token: string;
  headers: Headers = new Headers();

  constructor(public http: Http) {
    this.auth_token = (localStorage.getItem('auth_token'));
    this.headers.append('Accept', 'application/json');
    this.headers.append('authorization', 'Bearer ' + this.auth_token);
  }

  getUsers() {
    return this.http.get(this.baseURI + 'users', {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  getAvailableUsers(body) {
    return this.http.get(this.baseURI + 'users/available/' + body.date + '/' + body.time, {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  resetPassword(id) {
    this.body = {
      password: '123456',
    };
    return this.http.put(this.baseURI + 'users/password/' + id, this.body, {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  saveUser(body) {
    return this.http.post(this.baseURI + 'users', body, {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  updateUser(id, body) {
    return this.http.put(this.baseURI + 'users/' + id, body, {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  deleteUser(id) {
    return this.http.delete(this.baseURI + 'users/' + id, {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  getUser(id) {
    return this.http.get(this.baseURI + 'users/' + id, {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error || 'server error');
  }

}
