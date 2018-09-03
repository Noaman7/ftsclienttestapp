import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  

})
export class AppComponent {

  constructor()
  {
    this.Check()

  }
  title = 'fts2webclient';
  activePendingLink="nav-baractive";
  activeUserListLink="nav-bar";
  activeAddUserLink="nav-bar";
  activeUploadLink="nav-bar";
  currentUser="";
  showComponent:boolean;


  Check()
  {
    this.currentUser = localStorage.getItem('Login')
    if(this.currentUser=='Active')
    this.showComponent=true;
    else 
    this.showComponent=false;
  }
  Active(currentSelected){

    
    if(currentSelected=='Pending')
    {
    this.activePendingLink= "nav-baractive";
    this.activeUserListLink=this.activeAddUserLink=this.activeUploadLink="nav-bar";
    }
    if(currentSelected=='UserList')
    {
      this.activeUserListLink = "nav-baractive";
      this.activePendingLink=this.activeAddUserLink=this.activeUploadLink="nav-bar";
      }
    
    if(currentSelected=='AddUser')
    {
      this.activeAddUserLink  = "nav-baractive";
      this.activePendingLink=this.activeUserListLink=this.activeUploadLink="nav-bar";
      }
    if(currentSelected=='Upload')
    {
      this.activeUploadLink   = "nav-baractive";
      this.activePendingLink=this.activeUserListLink=this.activeAddUserLink="nav-bar";
      }
  }
}
