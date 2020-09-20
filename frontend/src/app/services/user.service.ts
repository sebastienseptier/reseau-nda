import { Injectable} from '@angular/core';
import { User } from '../models/user';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs/Observable";

const AUTH_API = 'http://localhost:3000/';
const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

	private httpOptions = {};
	users = [];

	constructor(private http: HttpClient, private _auth: AuthService) {
		if (this._auth.isUserLoggedIn) {
			this.httpOptions = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this._auth.getToken()
				})
			};
			console.log("safe");
		} else {
			this.httpOptions = {
				headers: new HttpHeaders({'Content-Type': 'application/json'})
			};
			console.log("unsafe");
		}
	}

	getUserList():Observable<Object> {
		console.log("get users !");
		return this.http.get(AUTH_API + 'api/users', httpOptions);
	}

	getUserById(userId: number):User {
		const user = this.users.find(
			(p) => {
				return p.id == userId;
		});	
		return user;
	}
}