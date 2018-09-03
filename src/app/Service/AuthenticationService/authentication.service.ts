import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ROOT_URL } from '../../models/config';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private httpClient: HttpClient, private _router: Router) { }


    login(newUser) {
       
        return this.httpClient.post(ROOT_URL + 'Users/authenticate', newUser, { observe: 'response' })
            .subscribe(response => {
                
                //  login successful if there's a jwt token in the response
                if (response && response.body) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(response));
                    
                    this._router.navigate(['pending']).catch()
                    {location.reload()};
                    
                }
              
            }, error => {
                if (error.status == 400 || error.status == 401) {
                    alert(error.error.message);
                    console.error(error.error.message);
                    console.error(error);
                    this._router.navigate(['login']);
                }
            });

    }

    public isAuthenticated(): boolean {
        return this.getToken() !== null;
    }

    getToken() {
        return localStorage.getItem('currentUser')
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('Login');
        this._router.navigate(['/login']);
        location.reload();
    }
}
