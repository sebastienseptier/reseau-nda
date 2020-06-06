import { Injectable} from '@angular/core';
import { User } from '../models/user';

@Injectable()
export class UserService {

	//Données temporaires, permet de tester l'utilisation des données.
	users = [];

	constructor() { }

	getUserList():User[] {
    	return this.users;
	}

	getUserById(userId: number):User {
		const user = this.users.find(
			(p) => {
				return p.id == userId;
		});	
		return user;
	}
}