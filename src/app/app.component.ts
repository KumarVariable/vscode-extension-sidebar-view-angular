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

  vscodeAssetPath : any;
  vscodeJson: any;

  
  constructor(){
    console.log((data as any).default);
    
  }

  ngOnInit() {
    this.vscodeJson = (data as any).default;
    this.vscodeAssetPath = '';

    if(this.vscodeJson.extensionFor == 'vscode') {
      this.vscodeAssetPath = this.vscodeJson.resourcePath;
    }
  }
}
