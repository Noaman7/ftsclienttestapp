import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/Service/UserService/user-data.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Service/AuthenticationService/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  sLoginID = "";
  sPassword = "";
  constructor(private _router: Router,private authservice:AuthenticationService ,private userService: UserDataService)
  {
    localStorage.setItem('Login','Inactive');
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

  }

  ngOnInit() {
  }

  Vadidate()
  {    
       var newuser={
              Name:"",
              LoginID: this.sLoginID,
              Password: this.sPassword,
              Role: "",
              Status: "",
              Location:""
  }
      this.authservice.login(newuser);
     
          
      
  }
  
}
