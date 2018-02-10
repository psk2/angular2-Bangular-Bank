
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {DataSource, CdkHeaderCellDef, CdkCellDef } from '@angular/cdk';
import {Observable} from 'rxjs/Observable';
import {MdSort, MdPaginator, SelectionModel} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { GithubService } from '../github/github.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-basic-example',
  templateUrl: './table-basic-example.component.html',
  styleUrls: ['./table-basic-example.component.css'],
  providers: [GithubService],

})
export class TableBasicExampleComponent implements OnInit  {
	public bloodBankList;
	public bloodBankListCount;
	public keys;
	public resultSet:Element[];
	dataSource: ExampleDataSource | null;
	selection = new SelectionModel<string>(true, []);
	displayedColumns = ["RRID", "Name", "ContactNumber", "Email", "AddressID", "Comment", "Status", "AuthorizedForCamp"];
	
  exampleDatabase = new ExampleDatabase();
  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild(MdSort) sort: MdSort;
  @ViewChild('filter') filter: ElementRef;
  
  constructor(private router: Router, private githubService: GithubService) {

  }
	ngOnInit() {
		var that=this;
		this.githubService.getAllBloodbanks().subscribe(
			lists => {
			this.bloodBankList = lists.results;
			this.resultSet = lists.results;
			this.keys = Object.keys(this.bloodBankList[0]);
			this.bloodBankListCount = this.bloodBankList.length;
			this.dataSource = new ExampleDataSource(this.resultSet, this.exampleDatabase, this.sort,  this.paginator);
			Observable.fromEvent(this.filter.nativeElement, 'keyup')
				.debounceTime(150)
				.distinctUntilChanged()
				.subscribe(() => {
				if (!this.dataSource) { return; }
				this.dataSource.filter = this.filter.nativeElement.value;
			});
			}
		);
	}
	
	isAllSelected(): boolean {
		if (!this.dataSource) { return false; }
		if (this.selection.isEmpty()) { return false; }
	
		if (this.filter.nativeElement.value) {
		  return this.selection.selected.length == this.dataSource.renderedData.length;
		} 
		// else {
		//   return this.selection.selected.length == this.exampleDatabase.data.length;
		// }
	}

	masterToggle() {
		if (!this.dataSource) { return; }
	
		if (this.isAllSelected()) {
		  this.selection.clear();
		} else if (this.filter.nativeElement.value) {
		  this.dataSource.renderedData.forEach(data => this.selection.select(data.RRID));
		} 
		// else {
		//   this.exampleDatabase.data.forEach(data => this.selection.select(data.RRID));
		// }
	}
}
 
export interface Element {
  RRID: string;
  Name: string;
  ContactNumber: number;
  AddressID: number;
  Email: string;
  Comment: string;
  Status : string;
  AuthorizedForCamp: string;
}
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<Element[]> = new BehaviorSubject<Element[]>([]);
//   get data(): Element[] { return this.dataChange.value; }
}
/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class ExampleDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
	public resultSet;
	_filterChange = new BehaviorSubject('');
	get filter(): string { return this._filterChange.value; }
	set filter(filter: string) { this._filterChange.next(filter); }

	filteredData: Element[] = [];
	renderedData: Element[] = [];
	constructor(resultSet, private _exampleDatabase: ExampleDatabase, private _sort: MdSort, private _paginator: MdPaginator,){
		super();
		this.resultSet =  resultSet;
		this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
	}

	connect(): Observable<Element[]> {
		const displayDataChanges = [
			this._exampleDatabase.dataChange,
			this._sort.mdSortChange,
			this._filterChange,
			this._paginator.page,
		];

		return Observable.merge(...displayDataChanges).map(() => {
			// return this.getSortedData();
			this.filteredData = this.resultSet.slice().filter((item: Element) => {
				let searchStr = (item.Name).toLowerCase();
				return searchStr.indexOf(this.filter.toLowerCase()) != -1;
			});
		
			// Sort filtered data
			const sortedData = this.getSortedData(this.filteredData.slice());
	
			// Grab the page's slice of the filtered sorted data.
			const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
			this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
			return this.renderedData;
		});
	}

  disconnect() {}
    getSortedData(data: Element[]): Element[] {
    // const data = this.data;
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';
      switch (this._sort.active) {
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

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}