import * as vscode from 'vscode';

import { Disposable, Webview, WebviewPanel, window, Uri, ViewColumn } from "vscode";
import { getUri } from "../../utils/getUri";
//import { getNonce } from "../../utils/getNonce";

let RESULT:any;
export class SqlconfigExplorer {
  constructor(context: vscode.ExtensionContext) {
    const configProvider = new SqlconfigProvider(context.extensionUri);

    context.subscriptions.push(
      vscode.window.registerWebviewViewProvider(SqlconfigProvider.viewType, configProvider
      ));
  }
}

class SqlconfigProvider implements vscode.WebviewViewProvider {

  public static readonly viewType = 'sqlconfigExplorer';
  public static currentWvVProvider: SqlconfigProvider | undefined;
  private _view: vscode.WebviewView | undefined;
  private _disposables: vscode.Disposable[] = [];

  constructor(private readonly _extensionUri: vscode.Uri) {
  }

  public resolveWebviewView(//IB20 SQLMAP CONFIG WEBVIEW 생성
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    token: vscode.CancellationToken
  ) {

    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        //this._extensionUri
        vscode.Uri.joinPath(this._extensionUri, 'out')
      ]
    };

    //완성된 html을 전달
    this._view.webview.html = this._getHtmlForWebView(webviewView.webview, this._extensionUri);
    console.log("RESULLLLLLLT :::::"+RESULT);
    this._view.webview.onDidReceiveMessage(message => {
      console.log(`Received selected option: `+message);
      // switch(message.type) {
      //   case 'selectedOption':
    	// 			{
      //         //TO DO 구현
    	// 				//vscode.window.activeTextEditor?.insertSnippet(new vscode.SnippetString(`#${data.value}`));
      //         console.log(`Received selected option: `);
    	// 				break;
    	// 			}
      // }

     });
    //TO DO select 된 sqlconfig값을 sqlmapDataExplorere에 postMessage...

  }

  /*
  //postMessage 예시
    public addColor() {
      if (this._view) {
        this._view.show?.(true); // `show` is not implemented in 1.49 but is for 1.50 insiders
        this._view.webview.postMessage({ type: 'addColor' });
      }
    }
  
    public clearColors() {
      if (this._view) {
        this._view.webview.postMessage({ type: 'clearColors' });
      }
    }
  */
   private _getHtmlForWebView(webview: vscode.Webview, extensionUri: Uri) {
    //정의된 javascript를 통해, html 동적으로 dropdown 항목 만들어주기.

    const srcUri = getUri(webview, extensionUri, ["out/views/explorer", "getsqlconfigLists.js"]);
    console.log("sqlconfigExplorerTS=>_getHtmlForWebView srcUri:" + srcUri);
    //<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; font-src ${webview.cspSource}; img-src ${webview.cspSource} https:;">
    return /*html*/ `
          <!DOCTYPE html>
      <html lang="en">

      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width,initial-scale=1.0">
          
          <script type="module" src="${srcUri}"></script>
          <script>${RESULT}=aa;</script>

          <title>IB20 SQL Config</title>
      </head>

      <body>
          <div class="sqlconfig-list">
              <label for="my-dropdown">Choose SQL CONFIG:</label>
              <select class="sqlconfig-list-dropdown" id="sqlconfig-list-dropdown">
                  <option value="">--Please choose an option--</option>
              </select>
          </div>
          <div class="selected-option" id="selected-option" value="" ></div>
      </body>

      </html>`;

  }

}

