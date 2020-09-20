import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Post } from '../models/post';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {AuthService} from "./auth.service";

const AUTH_API = 'http://localhost:3000/';
const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PostService {

	private httpOptions = {};
	posts = [];

	tags = ['Boite à idées', 'Culture', 'Papotages & souvenirs', 'Associations & clubs', 'Evénements', 'Jobs [Offres et demandes]'];

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

  	getPostList():Observable<Object> {
  		console.log("get posts !");
		return this.http.get(AUTH_API + 'api/posts', httpOptions);
	}

	getTagList():string[] {
    	return this.tags;
	}

	getMostReadPostList():Post[] {
		//TODO:Retourner les posts les plus lus.
		return this.posts.slice(1, 3);
	}
	
	getPostById(id: number):Post {
		const post = this.posts.find(
			(p) => {
				return p.id == id;
		});	
		return post;
	}
}
