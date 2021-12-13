/**
 * Extension Source Code.
 * This class is the entry point for our custom extension.
 */
 import * as fs from 'fs';
 import * as path from 'path';
 import * as vscode from 'vscode';
 
 /**
  * Manages webview panels
  */
 class WebPanel implements vscode.WebviewViewProvider {
   public static readonly viewType = 'angular.sidebar.view';
 
   private _view?: vscode.WebviewView;
   public readonly extensionPath: string;
   public readonly extensionUri: vscode.Uri;
   public readonly builtAppFolder: string;
 
   constructor(context: vscode.ExtensionContext) {
     this.extensionPath = context.extensionPath;
     this.extensionUri = context.extensionUri;
     this.builtAppFolder = 'dist';
   }
 
   public resolveWebviewView(
     webviewView: vscode.WebviewView,
     context: vscode.WebviewViewResolveContext,
     _token: vscode.CancellationToken
   ) {
     this._view = webviewView;
 
     webviewView.webview.options = {
       // Allow scripts in the webview
       enableScripts: true,
       localResourceRoots: [
         vscode.Uri.file(path.join(this.extensionPath, this.builtAppFolder)),
       ],
     };
 
     webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
   }
   private _getHtmlForWebview(webview: vscode.Webview): string {
     
     // path to dist folder
     /*
     const appDistPath = path.join(
       this.extensionPath,
       'dist',
       'apps',
       'vs-code',
       'angular'
     );
     */

     const appDistPath = path.join(
      this.extensionPath,
      'dist',
      'extension-src'
    );
 
     const appDistPathUri = vscode.Uri.file(appDistPath);
 
     // get path to index.html file from dist folder
     const indexPath = path.join(appDistPath, 'index.html');
 
     // read index file from file system
     let indexHtml = fs.readFileSync(indexPath, { encoding: 'utf8' });
 
     // 1. Get all links prefixed by href or src
     const matchLinks = /(href|src)="([^"]*)"/g;
 
     // 2. Transform the result of the regex into a vscode's URI format
     const toUri = (_: any, prefix: 'href' | 'src', link: string) => {
       
       if (link === '#') {
         return `${prefix}="${link}"`;
       }
       // For scripts & links
       const resourcePath = path.join(appDistPath, link);
       const uri = vscode.Uri.file(resourcePath);
       return `${prefix}="${webview['asWebviewUri'](uri)}"`;
     };
 
     /**  update the base URI tag for index.html at runtime
      * index.html will be found inside 'src/app' and
      * 'dist/angular' after running ng build
      */
     indexHtml = indexHtml.replace(matchLinks, toUri);
 
     // Dead Code (Unnecessary code)
     // writeToFile(this.extensionPath, webview);
 
     return indexHtml;
   }
 }
 
 /**
  * Activates extension
  * @param context vscode extension context
  */
 export function activate(context: vscode.ExtensionContext) {
   
  const provider = new WebPanel(context);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(WebPanel.viewType, provider)
  );

   const startDiscussionCommand = 'editor.startDiscussion';

   const startDiscussionCmdHandler = (comandName: string = 'Discussion') => {
    console.log(`Start ${comandName} Clicked!!!`);
    vscode.window.showInformationMessage(`Start ${comandName} Clicked!!!`);
  };

  context.subscriptions.push(
    vscode.commands.registerCommand(startDiscussionCommand, startDiscussionCmdHandler)
  );
 
   
 }
 
 /*
 
 function writeToFile(extensionPath: string, webview: vscode.Webview) {
   
   const vscodeSpecificFile  = path.join(extensionPath,'src','app','vscodeSpecificLocation.json');
   
   let extensionFor = 'vscode';
   
   let hardCodedPath = 'https://file+.vscode-resource.vscode-webview.net/d:/Tutorials/poc/vscode-extension-sidebar-view-angular/dist/apps/vs-code/angular/' 
 
 
   let vscodeProps = { 
     resourcePath: hardCodedPath,
     extensionFor: extensionFor
 };
  
 let data = JSON.stringify(vscodeProps, null, 2);
 
 fs.writeFile(vscodeSpecificFile, data, (err) => {
   if (err) {
     throw err;
   } else {
     console.log('Data written to file');
   }
   
 });
 
 }
 
 */