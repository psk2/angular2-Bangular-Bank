import { Component, OnInit, ViewChild, PipeTransform, Pipe } from '@angular/core';
import { DataSource, CdkTableModule} from '@angular/cdk';
import {MdPaginator} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { GithubService } from '../github/github.service';
import { Router } from '@angular/router';
import {Sort} from '@angular/material';
import {PageEvent} from '@angular/material';

// @Pipe({name: 'keys'})
// export class KeysPipe implements PipeTransform {
//   transform(value, args:string[]) : any {
//     if (!value) {
//       return value;
//     } 
//     let keys = [];
//     for (let key in value) {
//       keys.push({key: key, value: value[key]});
// 	} 
//     return keys;
//   } 
// }

@Component({
	selector: 'app-blood-bank-details',
	templateUrl: './blood-bank-details.component.html',
	styleUrls: ['./blood-bank-details.component.css'],
	providers: [GithubService],
	
})
export class BloodBankDetailsComponent implements OnInit {
	public bloodBankList;
	public bloodBankListCount;
	public keys;
	

	
	constructor(private router: Router, private githubService: GithubService) { }
	
	ngOnInit() {
		this.githubService.getAllBloodbanks().subscribe(
			lists => {
				console.log(lists);
				this.bloodBankList = lists.results;
				this.keys = Object.keys(this.bloodBankList[0]);
				console.log(this.keys)
				this.bloodBankListCount = this.bloodBankList.length;
			}
		);
	}
	length = this.bloodBankListCount;
	pageSize = 10;
	pageSizeOptions = [5, 10, 25, 100];

	// MdPaginator Output
	pageEvent: PageEvent;
	setPageSizeOptions(setPageSizeOptionsInput: string) {
		this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
	}

	getSortedData(sort : Sort) {
    const data = this.bloodBankList;
    if (!sort.active || sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';
      switch (sort.active) {
        case 'RRID': [propertyA, propertyB] = [a.RRID, b.RRID]; break;
        case 'Name': [propertyA, propertyB] = [a.Name, b.Name]; break;
        case 'ContactNumber': [propertyA, propertyB] = [a.ContactNumber, b.ContactNumber]; break;
        case 'Email': [propertyA, propertyB] = [a.Email, b.Email]; break;
        case 'AddressID': [propertyA, propertyB] = [a.AddressID, b.AddressID]; break;
        case 'Comment': [propertyA, propertyB] = [a.Comment, b.Comment]; break;
        case 'Status': [propertyA, propertyB] = [a.Status, b.Status]; break;
        case 'AuthorizedForCamp': [propertyA, propertyB] = [a.AuthorizedForCamp, b.AuthorizedForCamp]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (sort.direction == 'asc' ? 1 : -1);
    });
  }
}

