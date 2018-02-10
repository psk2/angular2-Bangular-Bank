import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github/github.service';
import { Router } from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [GithubService]
})
export class SearchComponent implements OnInit {

  public searchText;
  public resultSet;
  public resultSetCount;
  constructor(private router: Router, private githubService: GithubService) { }
  searchForm = new FormGroup({
    search: new FormControl()
  })
  ngOnInit() {
    // this.githubService.getUser();
  }
  // onKeyup(event){
  //   this.searchText = event.target.value;
  // }
showUserDetails(result){
  this.router.navigate(['user',result.alpha2_code])
}


  getUsers(){
    this.githubService.getUser(this.searchForm.value.search).subscribe(
      res => {
        console.log(res);
        this.resultSet = res.RestResponse.result;
        this.resultSetCount = this.resultSet.length;
      }
    );
  }

}
