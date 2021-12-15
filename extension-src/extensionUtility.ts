import * as path from 'path';
import * as fileSystem from 'fs';
import { ExtensionContext, Webview, Uri, WebviewOptions } from 'vscode';

let buildFolder: string = 'dist';
let resourcesFolder: string = 'extension-src';
let forwardSlash: string = '/';

/**
 * function to define content settings for a webview.
 * @param extensionUri
 * @returns {@link WebviewOptions}
 */
export function getWebviewOptions(extensionUri: Uri): WebviewOptions {
  return {
    // Enable javascript in the webview
    enableScripts: true,
    // And restrict the webview to only loading content from our extension's `dist` directory.
    localResourceRoots: [Uri.joinPath(extensionUri, buildFolder)],
  };
}

/**
 * function to convert a local file: URI into a special URI that VS Code
 * can use to load a subset of local resources ( images, stylesheets,
 * and other resources from extension or user's current workspace ).
 *
 * @param ExtensionContext
 * @returns URI (vscode-resource)
 */
export function getVSCodeUriScheme(extensionContext: ExtensionContext, webview: Webview) {
  
let staticContentLocation = buildFolder
    .concat(forwardSlash)
    .concat(resourcesFolder)
    .concat(forwardSlash);

let basePathOnDisk = Uri.joinPath(extensionContext.extensionUri, staticContentLocation);

let basePathURI = basePathOnDisk.with({ scheme: 'vscode-resource' });
let webUri = webview.asWebviewUri(basePathURI);
let vscodeUri = webUri.toString(true);

return vscodeUri;
}

/**
 * function to convert a local file: URI into a https URI that VS Code
 * can use to load a subset of local resources ( images, stylesheets,
 * and other resources from extension or user's current workspace ).
 *
 * @param ExtensionContext
 * @returns Https URI (https://)
 */
export function getHttpUriScheme(extensionContext: ExtensionContext, webview: Webview) {

let staticContentLocation = buildFolder
    .concat(forwardSlash)
    .concat(resourcesFolder)
    .concat(forwardSlash);

  const basePathOnDisk = extensionContext.asAbsolutePath(staticContentLocation);
  const basePathURI = webview.asWebviewUri(Uri.file(basePathOnDisk));
  let httpUri = basePathURI.toString(true);

  return httpUri;
}

/**
 * 
 * @param extensionContext 
 * @param webview 
 * @returns HTML(angular component) as webview
 */
export function getHTMLForWebviewView(extensionContext: ExtensionContext, webview: Webview): string {
  
let staticContentLocation = buildFolder
    .concat(forwardSlash)
    .concat(resourcesFolder)
    .concat(forwardSlash);

const basePath = extensionContext.asAbsolutePath(staticContentLocation);

  // get path to index.html file from dist folder
const indexPath = path.join(basePath, 'index.html');

  // read index file from file system
let indexHtml = fileSystem.readFileSync(indexPath, { encoding: 'utf8' });

  // 1. Get all links prefixed by href or src
const matchLinks = /(href|src)="([^"]*)"/g;

  // 2. Transform the result of the regex into a vscode's URI format
const toUri = (_: any, prefix: 'href' | 'src', link: string) => {
    if (link === '#') {
      return `${prefix}="${link}"`;
    }
    // For scripts & links
    const resourcePath = path.join(basePath, link);
    const uri = Uri.file(resourcePath);
    return `${prefix}="${webview['asWebviewUri'](uri)}"`;
  };

  /**  update the base URI tag for index.html at runtime
   * index.html will be found inside 'src/app' and
   * 'dist/angular' after running ng build
   */
indexHtml = indexHtml.replace(matchLinks, toUri);

console.log("......... Return HTML Webview view .........");

return indexHtml;
}
