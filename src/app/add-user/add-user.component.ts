
import { Component, OnInit, Inject } from '@angular/core';

import { Router } from '@angular/router';

import { UserDataService } from 'src/app/Service/UserService/user-data.service';
import { LocationDetails } from "src/app/models/LocationData";

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    
})
export class AddUserComponent implements OnInit {
    ngOnInit(): void {

    }

    showPassword = false;
    showConfirmPassword = false;

    sName = "";
    sLoginID = "";
    sPassword = "";
    sStatus = "";
    sRole = "";
    sLocation = "";
    sConfirmPassword = "";

    constructor(private _router: Router, private userService: UserDataService) {

        this.userService.getLocation().subscribe((data: LocationDetails[]) => {
            this.Locations = data;
        }, error => console.error(error));

        userService.getLocation()
    }

    Roles = [
        { role: "Admin" },
        { role: "Operator" },
        { role: "Engineer" },
    ];

    Locations: any;

    addNewUser() {
        var newuser = {
            Name: this.sName,
            LoginID: this.sLoginID,
            Password: this.sPassword,
            Role: this.sRole,
            Status: this.sStatus,
            Location: this.sLocation,
        }
        this.userService.getAddUser(newuser);;
        this._router.navigate(['users']);
    }

    toggleShowPassword() {
        this.showPassword = (this.showPassword) ? false : true;

    }

    toggleConfirmShowPassword() {
        this.showConfirmPassword = (this.showConfirmPassword) ? false : true;

    }

}
