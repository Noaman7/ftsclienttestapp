import { Component, OnInit } from '@angular/core';
import { UserDetails } from "../models/UserData";
import { UserDataService } from 'src/app/Service/UserService/user-data.service';

@Component({
    selector: 'app-fetch-user',
    templateUrl: './fetch-user.component.html',
   

})

export class FetchUserComponent implements OnInit {


    title = 'Users List';
    
    public userdetails: UserDetails[];

    ngOnInit() {
        this.getusers();
    }
    constructor(private userService: UserDataService) {
    }

    getusers() {
        this.userService.getUsers().subscribe((data: UserDetails[]) => {
            this.userdetails = data;
        }, error => console.error(error));
    }
}

