import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth.service";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	isUserLoggedIn = false;

	constructor(private _auth: AuthService) {
		// Subscribe here, this will automatically update
		// "isUserLoggedIn" whenever a change to the subject is made.
		this._auth.isUserLoggedIn.subscribe( value => {
			this.isUserLoggedIn = value
		});
	}

	ngOnInit() {
	}

	logOutButton() {
		this._auth.logOutUser();
	}
}