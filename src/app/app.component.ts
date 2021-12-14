import { Component } from '@angular/core';
import * as data from '../app/vscodeSpecificLocation.json';

/**
 * Application (root) component - <app-root> declared inside src/app/index.html
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'Users';

  public extensionFor: any;
  public httpUri : any;
  public vscodeUri : any;
  public vscodeAssetPath: any;
  

  
  constructor(){
    // console.log((data as any).default);

   
    this.extensionFor = localStorage.getItem('extensionFor');
    this.httpUri = localStorage.getItem('httpUri');
    this.vscodeUri = localStorage.getItem('vscodeUri');

    console.log("ANGULAR 1 " , this.extensionFor);
    console.log("ANGULAR 2 httpUri " , this.httpUri);
    console.log("ANGULAR 2 vscodeUri " , this.vscodeUri);
    
  }

  ngOnInit() {

    this.vscodeAssetPath = '';

    if(this.extensionFor == 'vscode') {
      console.log("inside if condition ");
      this.vscodeAssetPath = this.httpUri;
     // this.vscodeAssetPath = this.vscodeSchemeUriPath;
     
    }
  }
}
