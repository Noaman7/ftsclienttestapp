import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpClient } from "@angular/common/http";
import { UserDetails } from "src/app/models/UserData";
import { ROOT_URL } from "src/app/models/config";
import { LocationDetails } from "src/app/models/LocationData";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

    _router: any;
  constructor(private httpClient: HttpClient,private router: Router) {
    this._router = router;

  }

  getUsers(): Observable<UserDetails[]> {
     return this.httpClient.get <UserDetails[]> (ROOT_URL + 'Users')
  }

  getAddUser(newUser){
    
    return this.httpClient.post(ROOT_URL+'Users/',newUser,{observe: 'response'})
    .subscribe(response => {
                         var result = response.body as UserDetails;
                         console.info("Response after adding User " + response+" " +response.status);
                         if(response.status==200 || response.status==201)
                         alert("User " + result.name + " " + " added successfully with \n Login ID " + result.loginID);        
                        
                        }, error => {
                    if (error.status == 409) {
                        alert("Entered Login ID Already Exist");
                        console.error(error);
                    }
                });

  }

    getLocation() {
     return this.httpClient.get <LocationDetails[]> (ROOT_URL + 'Location/ftslocation')
  }



  ValidateUser(newUser){
    
    return this.httpClient.post(ROOT_URL+'Users/authenticate',newUser,{observe: 'response'})
    .subscribe(response => {  },
         error => {
                    if (error.status == 401) {
                        alert("Username or Password is incorrect");
                        console.error(error);
                    }
                });

  }







  }

 