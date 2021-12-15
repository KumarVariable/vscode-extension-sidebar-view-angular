/**
 * Extension Source Code.
 * This class is the entry point for our custom extension.
 */
import * as vscode from 'vscode';
import { getWebviewOptions, getVSCodeUriScheme, getHttpUriScheme, getHTMLForWebviewView } from './extensionUtility';

/**
 * Manages webview panels
 */
class WebPanel implements vscode.WebviewViewProvider {
  public static readonly viewType = 'angular.sidebar.view';

  private _view?: vscode.WebviewView;

  public readonly extensionContext: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.extensionContext = context;
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;

    webviewView.webview.options = getWebviewOptions(this.extensionContext.extensionUri);

    webviewView.webview.html = getHTMLForWebviewView(this.extensionContext, webviewView.webview);

    webviewView.onDidChangeVisibility((e) => vscodeStatus());

    webviewView.onDidDispose(function (event) {
      console.log('............ onDidDispose Event happened:...... ' + event);
    });

    let vscodeUriPath = getVSCodeUriScheme(this.extensionContext,webviewView.webview);

    let httpUriPath = getHttpUriScheme(this.extensionContext,webviewView.webview);

    webviewView.webview.postMessage({
      vscodeUri: vscodeUriPath,
      httpUri: httpUriPath,
    });
  }

}

/**
 * Activates extension
 * @param context vscode extension context
 */
export function activate(context: vscode.ExtensionContext) {

  const startDiscussionCommand = 'editor.startDiscussion';
  const provider = new WebPanel(context);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(WebPanel.viewType, provider)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(startDiscussionCommand, function () {
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


export function deactivate() {
  console.log('................ DEACTIVATED.................');
}

function vscodeStatus(): any {
  console.log('onDidChangeVisibility() -> vscodeStatus() called ');
}
