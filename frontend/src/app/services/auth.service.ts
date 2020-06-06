import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";

const AUTH_API = 'http://localhost:4000/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      birthDate: user.birthDate,
      promotion: user.promotion
    }, httpOptions);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }


}
