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
  private readonly builtAppFolder: string;
  //private disposables: vscode.Disposable[] = [];

  constructor(extensionPath: string) {
    this.extensionPath = extensionPath;
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
    const appDistPath = path.join(this.extensionPath, 'dist','vscode-extension-sidebar-view-angular');
    const appDistPathUri = vscode.Uri.file(appDistPath);

    // path as uri
    const baseUri = webview.asWebviewUri(appDistPathUri);

    // get path to index.html file from dist folder
    const indexPath = path.join(appDistPath, 'index.html');

    // read index file from file system
    let indexHtml = fs.readFileSync(indexPath, { encoding: 'utf8' });

    // update the base URI tag
    indexHtml = indexHtml.replace(
      '<base href="/">',
      `<base href="${String(baseUri)}/">`
    );

    return indexHtml;
  }
}

/**
 * Activates extension
 * @param context vscode extension context
 */
export function activate(context: vscode.ExtensionContext) {
  const provider = new WebPanel(context.extensionPath);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(WebPanel.viewType, provider)
  );
}
