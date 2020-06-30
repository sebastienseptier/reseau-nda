import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { User } from '../../../models/user';
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { AlertService } from "../../../services/alert.service";

@Component({
	selector: 'app-form-inscription',
	templateUrl: './form-inscription.component.html',
	styleUrls: ['./form-inscription.component.css']
})
export class FormInscriptionComponent implements OnInit {

	@Input() user: User;
	validateTherms: boolean = false;
	promotions = [];
	//Données temporaires permettant de tester le formulaire.

	myform: FormGroup;
	firstName: FormControl;
	lastName: FormControl;
	birthDate: FormControl;
	promotion: FormControl;
	email: FormControl;
	password: FormControl;
	checkTherms: FormControl;

	alertOptions = {
		autoClose: true,
		keepAfterRouteChange: true
	};

	constructor(private _auth: AuthService, protected alertService: AlertService, private _router: Router) { }

	ngOnInit() {
		for (let i = new Date().getFullYear(); i >= 1900; --i)
			this.promotions.push({"id": i, "name": i});
		//On définit un nouvel utilisateur s'il le component est utilisé depuis la page d'inscription.
		if (this.user == undefined) {
			this.user = { 
				id: '1',
				email: '', password: '',
				firstName: '',lastName: '',
				registrationDate: '',
				birthDate: '', promotion: 0
			}
		}
		else {
			this.validateTherms = true;
		}
		this.createFormControls();
		this.createForm();
	}
	
	createFormControls() {
		this.firstName = new FormControl(this.user.firstName, Validators.required);
		this.lastName = new FormControl(this.user.lastName, Validators.required);
		this.birthDate = new FormControl(this.user.birthDate, Validators.required);
		this.promotion = new FormControl(this.user.promotion, [
			Validators.required,
			Validators.pattern(/^[0-9]\d*$/),
			Validators.min(1900)
		]);
		this.email = new FormControl(this.user.email, [
			Validators.required,
			Validators.pattern("[^ @]*@[^ @]*")
		]);
		this.password = new FormControl(this.user.password, [
			Validators.required,
			Validators.minLength(8),
			Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,26})")
		]);
		this.checkTherms = new FormControl(this.validateTherms, Validators.required);
	}
	
	createForm() {
		this.myform = new FormGroup({
			firstName: this.firstName,
			lastName: this.lastName,
			birthDate: this.birthDate,
			promotion: this.promotion,
			email: this.email,
			password: this.password,
			checkTherms: this.checkTherms
		});
	}

	onFormSubmit(form:NgForm){
		//console.trace();
		console.log(form); 
		this._auth.register(form).subscribe(
			res => {
				console.log(res);
				localStorage.setItem('token', res.token);
				this._auth.logUser(res.user);
				this.alertService.success('Bienvenue '+res.user.firstName+', vous vous êtes inscrit(e) avec succès.', this.alertOptions);
				this._router.navigate(['/posts']);
			},
			err => {
				this.alertService.error('Erreur lors de l\'inscription.', this.alertOptions);
				console.log(err);
			},
		);
	}
}