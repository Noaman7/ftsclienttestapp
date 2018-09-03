import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ROOT_URL } from "src/app/models/config";
import { VersionDetails } from "src/app/models/VersionData";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class VersionService {
  
  constructor(private httpClient: HttpClient, private router: Router) {
    router;

  }

  getPending() {
    return this.httpClient.get<VersionDetails[]>(ROOT_URL + 'Version/FileList')
  }

  approveVersions(version: any, _approvedBy) {
    return this.httpClient.get<VersionDetails[]>(ROOT_URL + 'Version/ApproveConfig/' + version[0]["version"] + '/' + version[0]["deviceType"] + '/' + _approvedBy);
  }

  rejectVersions(version: any) {
    console.info("In reject " + version);
    return this.httpClient.get<VersionDetails[]>(ROOT_URL + 'Version/RejectConfig/' + version + '/Device3');
  }

  rejectAllVersions(version: VersionDetails[]) {
    console.info("In reject all " + version);
    return this.httpClient.post(ROOT_URL + 'Version/Reject/', version, { observe: 'response' })
  }

  uploadConfig(newConfig) {
    return this.httpClient.post(ROOT_URL + 'Version/Upload/', newConfig, { observe: 'response' })
      .subscribe(response => {
        var result = response.body as VersionDetails;
        if (response.status == 200 ||response.status == 201 )
          alert("File Uploaded Successfully");
          this.router.navigate(['pending']);
      }, error => {
        console.error(error);
      });
  }
}
