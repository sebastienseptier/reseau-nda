import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Post } from '../models/post';
import { Router } from '@angular/router';


@Injectable()
export class PostService {

	//Données temporaires, permet de tester l'utilisation des données.
  	posts = [

	];

	tags = ['Boite à idées', 'Culture', 'Papotages & souvenirs', 'Associations & clubs', 'Evénements', 'Jobs [Offres et demandes]'];

  	constructor() { }

  	getPostList():Post[] {
    	return this.posts;
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
