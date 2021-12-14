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
   
   public readonly builtAppFolder: string;
   public readonly vscodeExtensionContext: vscode.ExtensionContext;
 
   constructor(context: vscode.ExtensionContext) {
     this.builtAppFolder = 'dist';
     this.vscodeExtensionContext = context;
   }
 
   public resolveWebviewView(
     webviewView: vscode.WebviewView,
     context: vscode.WebviewViewResolveContext,
     _token: vscode.CancellationToken
   ) {
     this._view = webviewView;

     webviewView.webview.options = getWebviewOptions(this.vscodeExtensionContext.extensionUri);
 
     webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    
     

     let vscodeUri = getVSCodeUriScheme(this.vscodeExtensionContext, webviewView.webview);
     let httpUri = getHttpUriScheme(this.vscodeExtensionContext, webviewView.webview);

     webviewView.webview.postMessage(
       { 
         vscodeUri: vscodeUri,
         httpUri: httpUri,
        }
      );

   }

  private _getHtmlForWebview(webview: vscode.Webview): string {
     
  const destinationLocation = "dist/extension-src";

  const basePath = this.vscodeExtensionContext.asAbsolutePath(destinationLocation);
 
     // get path to index.html file from dist folder
     const indexPath = path.join(basePath, 'index.html');
 
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
       const resourcePath = path.join(basePath, link);
       const uri = vscode.Uri.file(resourcePath);
       return `${prefix}="${webview['asWebviewUri'](uri)}"`;
     };
 
     /**  update the base URI tag for index.html at runtime
      * index.html will be found inside 'src/app' and
      * 'dist/angular' after running ng build
      */
    indexHtml = indexHtml.replace(matchLinks, toUri);

    console.log('...................... activation called');
    
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

  context.subscriptions.push(
    vscode.commands.registerCommand(startDiscussionCommand, function(){
      startDiscussion();
    })
  );

 
 
 }

 /** 
  * Callback function for Start Discussion command invoked via a keyboard shortcut
  * a menu item or command palette. 
  * */ 
 async function startDiscussion() {

console.log('Hello Start Discussion');
}

function getWebviewOptions(extensionUri: vscode.Uri): vscode.WebviewOptions {
	return {
		// Enable javascript in the webview
		enableScripts: true,

		// And restrict the webview to only loading content from our extension's `dist` directory.
		localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'dist')]
	};
}


function getVSCodeUriScheme(vscodeExtensionContext: vscode.ExtensionContext, webview: vscode.Webview) {
  
  let destinationLocation = "dist/extension-src/";

  let basePathOnDisk = vscode.Uri.joinPath(vscodeExtensionContext.extensionUri, destinationLocation);
  let basePathURI = (basePathOnDisk).with({ 'scheme': 'vscode-resource' });

  let vscodeUri = basePathURI.toString(true);

 
  return vscodeUri;
}

function getHttpUriScheme(vscodeExtensionContext: vscode.ExtensionContext, webview: vscode.Webview) {
  
  let destinationLocation = "dist/extension-src/";

  const basePathOnDisk = vscodeExtensionContext.asAbsolutePath(destinationLocation);
  const basePathURI = webview.asWebviewUri(vscode.Uri.file(basePathOnDisk));

  let httpUri = basePathURI.toString(true);

  return httpUri;
}

export function deactivate() {
  console.log("................ DEACTIVATED.................");
}
 