import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import {PaginationService} from "../../../services/pagination.service";
import {AlertService} from "../../../services/alert.service";

@Component({
	selector: 'app-list-user',
	templateUrl: './list-user.component.html',
	styleUrls: ['./list-user.component.css'] 
})
export class ListUserComponent implements OnInit {

	users: {};
	alertOptions = {
		autoClose: true,
		keepAfterRouteChange: true
	};

	constructor(private userService: UserService, private paginationService: PaginationService, protected alertService: AlertService) { }

	ngOnInit() {
		this.users = this.userService.getUserList().subscribe(
			res => {
				console.log(this.users);
			},
			err => {
				this.alertService.error('Impossible de récupérer les derniers utilisateurs.', this.alertOptions);
				console.log(err);
			},
		);
	}
}