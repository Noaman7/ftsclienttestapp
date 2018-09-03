import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { saveAs } from 'file-saver';
import { Router } from "@angular/router";
import { VersionDetails } from "../models/VersionData";
import { VersionService } from "src/app/Service/VersionService/version.service";
import { AuthenticationService } from '../Service/AuthenticationService/authentication.service';


@Component({
    selector: 'app-pending-approvals',
    templateUrl: './pending-approvals.component.html',

})
export class PendingApprovalsComponent implements OnInit {
    
    public versionList: VersionDetails[];
    sVersion: any;
    sDeviceType: any;
    selectedVersions = [];
    disable = false;
    disableReject = false;
    currentUser: any;
   
    constructor(private _versionService: VersionService, private authservice: AuthenticationService, private _router: Router) {
       
        localStorage.setItem('Login','Active');
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));  
        
    }

    ngOnInit() {
        this.getPending();  
    }


    toggleButton() {
        if (this.selectedVersions.length == 1) {
            this.disable = true;
            this.disableReject = true;
        }
        else if (this.selectedVersions.length == 0) {
            this.disable = false;
            this.disableReject = false;
        }
        else {
            this.disable = false;
            this.disableReject = true;
        }
    }

    checkFirst(detail: VersionDetails) {
        if (this.selectedVersions.indexOf(detail) == -1) {
            this.selectedVersions.push(detail);
            this.toggleButton();
            console.info('After Push', this.selectedVersions);
        }
        else {
            let index = this.selectedVersions.indexOf(detail);
            this.selectedVersions.splice(index, 1);
            this.toggleButton();
            console.info('After splice', this.selectedVersions);
        }
    }

    getPending() {
        this._versionService.getPending().subscribe((data: VersionDetails[]) => {
            this.versionList = data;
            this.selectedVersions = [];
            this.disable = false;
            this.disableReject = false;
            
        }, error => console.error(error));

    }

    approveVersion() {
        this._versionService.approveVersions(this.selectedVersions, this.currentUser.body.name).subscribe((data: VersionDetails[]) => {
            this.versionList = data;
            this.disable = false;
            console.info("Calling Pending after Approve");
            this.getPending();

        }, error => console.error(error));



    }


    rejectAllVersion() {
        console.info("Component Reject all");
        this._versionService.rejectAllVersions(this.selectedVersions).subscribe(response => {
            console.info("Calling Pending after Reject");
            this.getPending();
            console.info("Response after adding User " + response);

        }, error => {
            if (error.status == 409) {
                alert("Entered Login ID Already Exist");
                console.error(error);
            }
        });

    }

    download(data: any, version: number, name: string) {
        var a = atob(data)
        var filename = name.substr(0, name.lastIndexOf('.'));
        console.info(filename); 
        var file = new Blob([a], { type: 'application/json' });
        saveAs(file, filename + '_V' + version + '.txt');

    }

    logout() {
        this.authservice.logout();

    }

}
