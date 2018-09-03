import { Component } from '@angular/core';
import { AuthenticationService } from '../Service/AuthenticationService/authentication.service';


@Component({
  selector: 'app-navtab',
  templateUrl: './navtab.component.html',
  styleUrls: ['./navtab.component.css']
})
export class NavtabComponent {
  activePendingLink = "nav-baractive";
  activeUserListLink = "nav-bar";
  activeAddUserLink = "nav-bar";
  activeUploadLink = "nav-bar";
  currentUser: any;

  constructor(private authservice: AuthenticationService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }


  logout() {
    this.authservice.logout();
  }
  Active(currentSelected) {


    if (currentSelected == 'Pending') {
      this.activePendingLink = "nav-baractive";
      this.activeUserListLink=this.activeAddUserLink=this.activeUploadLink= "nav-bar";
    }
    else if (currentSelected == 'UserList') {
      this.activeUserListLink = "nav-baractive";
      this.activePendingLink =this.activeAddUserLink =this.activeUploadLink= "nav-bar";
    }

    else if (currentSelected == 'AddUser') {
      this.activeAddUserLink = "nav-baractive";
      this.activePendingLink = this.activeUserListLink = this.activeUploadLink = "nav-bar";
    }
    else if (currentSelected == 'Upload') {
      this.activeUploadLink = "nav-baractive";
      this.activePendingLink = this.activeUserListLink = this.activeAddUserLink = "nav-bar";
    }

  }
}