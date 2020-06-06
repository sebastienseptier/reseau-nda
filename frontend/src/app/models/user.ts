import { Location } from './location';
import { Group } from './group';
import { Grade } from './grade';

export interface User {
    id: String;
	email: String;
	password: String;
	firstName: String;
	lastName: String;
	registrationDate: String;
	birthDate: String;
	promotion: number;
}