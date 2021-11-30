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
    const appDistPath = path.join(
      this.extensionPath,
      'dist',
      'apps',
      'vs-code',
      'angular'
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

    writeToFile(this.extensionPath);

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
}


function writeToFile(extensionPath: string) {
  
  const vscodeLocationPath  = path.join(extensionPath,'dist','apps','vs-code','angular','vscodeLocation.json');

  const applicationBasePath  = path.join(extensionPath,'dist','apps','vs-code','angular');

  const applicationAssetsPath  = path.join(extensionPath,'dist','apps','vs-code','angular','assets');

  let vscodeLocation = { 
    vscodeJsonFile: vscodeLocationPath,
    applicationBasePath: applicationBasePath, 
    applicationAssetsPath: applicationAssetsPath,
    department: 'English',
    car: 'Honda' 
};
 
let data = JSON.stringify(vscodeLocation, null, 2);

fs.writeFile(vscodeLocationPath, data, (err) => {
  if (err) {
    throw err;
  } else {
    console.log('Data written to file');
  }
  
});

}

