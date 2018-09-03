import { Component, OnInit } from '@angular/core';
import { VersionService } from "src/app/Service/VersionService/version.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-upload-config',
  templateUrl: './upload-config.component.html',
})
export class UploadConfigComponent implements OnInit {
  base64textString: string;
  fileToUpload: File;
  _DeviceType: "";
  _Comment: string;
  currentUser: any;
  selectedFile:any;

  constructor(private _versionService: VersionService, private _router: Router) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
   
    if (files && this.fileToUpload) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(this.fileToUpload);

    }
  }

  _handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    console.log(this.base64textString);
    
  }


  ngOnInit() {
  }

  onSubmit() {

    
    console.info(this.fileToUpload.name); 
  
    var newConfig = {
      Name: this.fileToUpload.name,
      Content: this.base64textString,
      Version: 1,
      Status: "Pending",
      FTS_ID: "2545",
      ChangedBy: this.currentUser.body.name,
      Comment: this._Comment,
      ApprovedBY: this.currentUser.body.name,
      DateTime: "",
      DeviceType: this._DeviceType,
      Release: 0
    }
    this._versionService.uploadConfig(newConfig);
  }
}
