import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from "rxjs";

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

  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.loggedIn());

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    console.log("regis");
    return this.http.post(AUTH_API + 'signup', {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      birthDate: user.birthDate,
      promotion: user.promotion
    }, httpOptions);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logUser(user) {
    this.isUserLoggedIn.next(true);
  }

  logOutUser() {
    this.isUserLoggedIn.next(false);
    localStorage.clear();
  }
}
