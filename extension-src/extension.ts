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
  private readonly extensionPath: string;
  private readonly extensionUri: vscode.Uri;
  private readonly builtAppFolder: string;

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
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this.extensionUri,
        'dist',
        'vscode-extension-sidebar-view-angular',
        'main.js'
      )
    );

    console.log('scriptUri ' + scriptUri);
    // path to dist folder
    const appDistPath = path.join(
      this.extensionPath,
      'dist',
      'apps',
      'vs-code',
      'angular'
    );
    const appDistPathUri = vscode.Uri.file(appDistPath);

    // path as uri
    const baseUri = webview.asWebviewUri(appDistPathUri);

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
