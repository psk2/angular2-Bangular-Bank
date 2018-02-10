import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { GithubService } from "../github/github.service";

@Component({
  selector: 'app-create-blood-bank',
  templateUrl: './create-blood-bank.component.html',
  styleUrls: ['./create-blood-bank.component.css'],
  providers: [GithubService]
})
export class CreateBloodBankComponent implements OnInit {
	public createbloodBankForm;
	
  constructor(private githubService: GithubService) { 
	 this.createbloodBankForm = new FormGroup({
		Name: new FormControl(),
		LoginID: new FormControl(),
		AuthProvider: new FormControl(),
		AuthorizedForCamp: new FormControl(),
		ContactNumber: new FormControl(),
		Email: new FormControl(),
		PINCode: new FormControl(),
		AddressLine : new FormControl(),
		City: new FormControl(),
		LandMark: new FormControl(),
		State: new FormControl(),
		Country: new FormControl()
	})
  }

  ngOnInit() {
  }

	onSubmit(){    
		console.log(this.createbloodBankForm.value)  
		this.githubService.createBloodBank(this.createbloodBankForm.value).subscribe(
			res => {
				console.log(res);
			}
		);
	} 
}