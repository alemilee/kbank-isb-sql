import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

const jsonFilePath = path.join(__dirname, 'sampleData.json');
const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
const data = JSON.parse(jsonData);

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
	private _view?: vscode.WebviewView;

	constructor(
		private readonly _extensionUri: vscode.Uri,
	){}

	public resolveWebviewView(//IB20 SQLMAP CONFIG WEBVIEW 생성
		webviewView: vscode.WebviewView, 
		context: vscode.WebviewViewResolveContext, 
		token: vscode.CancellationToken,
	) {
		this._view = webviewView;
		webviewView.webview.options = { //options에 추가로 들어갈 것 .. ?
			enableScripts: true,
			localResourceRoots: [
				this._extensionUri
			]
		};

		webviewView.webview.html = this._getHtmlForWebView(webviewView.webview);//SQL CONFIG DATA가져오기
		//Config list... html ?

	}

	private _getHtmlForWebView(webview: vscode.Webview){

		//SQL Config 리스트 뿌리기 위한 mock-up data (추후 DB연결)
		const srcUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'out/views/explorer', 'getsqlconfigLists.js'));
		//SQL Config 리스트 html..

		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<title>IB20 SQL Config</title>
			</head>
			<body class="sqlconfig-list" id="sqlconfig-list">


			

				<script src="${srcUri}"></script>
				<div class="monaco-icon-label-container">
			<span class="monaco-icon-name-container">
			<a class="label-name">
			<span class="monaco-highlighted-label">Parent 1</span></a></span></div>

			</body>
			</html>`;

	}

}