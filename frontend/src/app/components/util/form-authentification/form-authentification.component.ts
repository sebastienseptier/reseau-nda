import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, NgForm} from '@angular/forms';
import { AuthService } from "../../../services/auth.service";
import { AlertService } from "../../../services/alert.service";
import { Router } from "@angular/router";

@Component({
	selector: 'app-form-authentification',
	templateUrl: './form-authentification.component.html',
	styleUrls: ['./form-authentification.component.css']
})
export class FormAuthentificationComponent implements OnInit {

	myform: FormGroup;
	email: FormControl;
	password: FormControl;

	alertOptions = {
		autoClose: true,
		keepAfterRouteChange: true
	};

	constructor(private _auth: AuthService, protected alertService: AlertService, private _router: Router) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
	}
	
	createFormControls() {
		this.email = new FormControl('', [
			Validators.required,
			Validators.pattern("[^ @]*@[^ @]*")
		]);
		this.password = new FormControl('', [
			Validators.required,
			Validators.minLength(8),
			Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,16})")
		]);
	}
	
	createForm() {
		this.myform = new FormGroup({
			email: this.email,
			password: this.password
		});
	}

	onFormSubmit(form:NgForm){
		console.log(form);
		this._auth.login(form).subscribe(
			res => {
				console.log(res);
				localStorage.setItem('token', res.token);
				this.alertService.success('Success!!', this.alertOptions);
				this._router.navigate(['/posts']);
			},
			err => {
				console.log(err);
			},
		);
	}

}