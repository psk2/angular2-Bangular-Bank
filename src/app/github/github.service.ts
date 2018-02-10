import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class GithubService {
  constructor(private http:Http) {
    this.http = http;
   }
getUserDetail(userId): Observable<any>{
    // const searchText = 'js';
    // const url = 'http://services.groupkt.com/country/get/all';
    const url= 'http://services.groupkt.com/country/get/iso2code/'+userId;
    return this.http.get(url).map(
      res => {
        const user = res.json();
        console.log(user);
        return user;
      }
    )
}

getUser(searchText): Observable<any>{
    // const searchText = 'js';
    // const url = 'http://services.groupkt.com/country/get/all';
    const url= 'http://services.groupkt.com/country/search?text='+searchText;
    return this.http.get(url).map(
      res => {
        const data = res.json();
        console.log(data);
        return data;
      }
    )
  }

getAllBloodbanks(): Observable<any>{
    // const searchText = 'js';
    // const url = 'http://services.groupkt.com/country/get/all';
	let headers = new Headers({
		'Content-Type':"application/json", 
		'x-api-key':'GCmLIXv0bE9mEIkJraa8z4lXzkauJDOC2Ptb5NLE'
	});
	let options = new RequestOptions({ headers: headers });   
    const url= 'https://2xtkt2n3a1.execute-api.us-west-2.amazonaws.com/lambda/GetListBloodBank';
    return this.http.get(url, options).map(
      res => {
        const bloodBanks = res.json();
        return bloodBanks;
      }
    )
  }

createBloodBank(newBloodBankData): Observable<any>{
    let newBloodBank:any =  {
      "CollectionCenterRegistrationRequest": {
        "CollectionCenterRegistrationDetails": {
          "LoginID": newBloodBankData.LoginID, 
          "AuthProvider":newBloodBankData.AuthProvider, 
          "AuthorizedForCamp":newBloodBankData.AuthorizedForCamp, 
          "ContactNumber":newBloodBankData.ContactNumber, 
          "Email":newBloodBankData.Email, 
          "PINCode":newBloodBankData.PINCode, 
          "Name":newBloodBankData.Name, 
          "AddressLine":newBloodBankData.AddressLine, 
          "City":newBloodBankData.City, 
          "LandMark":newBloodBankData.LandMark, 
          "State":newBloodBankData.State, 
          "Country":newBloodBankData.Country, 
          "Latitude":"", 
          "Longitude":""
        }
      }
	}
	console.log(newBloodBank)
    const url= 'http://services.groupkt.com/country/search?text='+newBloodBank;
    return this.http.get(url).map(
      res => {
        const data = res.json();
        console.log(data);
        return data;
      }
    )
  }

}
