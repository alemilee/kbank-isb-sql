"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloWorldPanel = void 0;
const vscode = require("vscode");
const getUri_1 = require("../utilities/getUri");
// panel class
class HelloWorldPanel {
    // 생성자
    constructor(panel, extensionUri) {
        this._disposables = [];
        this._panel = panel;
        this._panel.onDidDispose(this.dispose, null, this._disposables);
        this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri);
        this._setWebviewMessageListener(this._panel.webview);
    }
    // render 메서드
    static render(extensionUri) {
        // 이미 있으면 띄우고
        if (HelloWorldPanel.currentPanel) {
            HelloWorldPanel.currentPanel._panel.reveal(vscode.ViewColumn.One);
        }
        else { // 없으면 새로 생성
            const panel = vscode.window.createWebviewPanel("hello-world", "Hello World", vscode.ViewColumn.One, {
                // JavaScript를 동작하도록 허용
                enableScripts: true,
            });
            HelloWorldPanel.currentPanel = new HelloWorldPanel(panel, extensionUri);
        }
    }
    dispose() {
        // panel 초기화
        HelloWorldPanel.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const disposable = this._disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
    }
    _getWebviewContent(webview, extensionUri) {
        // webview, uri, path list
        const toolkitUri = (0, getUri_1.getUri)(webview, extensionUri, [
            "node_modules",
            "@vscode",
            "webview-ui-toolkit",
            "dist",
            "toolkit.js", // A toolkit.min.js file is also available
        ]);
        // uri 가져오기
        const mainUri = (0, getUri_1.getUri)(webview, extensionUri, ["webview-ui", "main.js"]);
        return /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <script type="module" src="${toolkitUri}"></script>
        // uri를 위한 script
        <script type="module" src="${mainUri}"></script>
        <title>Hello World!</title>
      </head>
      <body>
        <h1>Hello World!</h1>
        <vscode-button id="howdy">Howdy!</vscode-button>
      </body>
    </html>
  `;
    }
    _setWebviewMessageListener(webview) {
        // message 받기
        webview.onDidReceiveMessage((message) => {
            // command와 내용
            const command = message.command;
            const text = message.text;
            switch (command) {
                case "hello":
                    // 실행할 코드
                    vscode.window.showInformationMessage(text);
                    return;
            }
        }, undefined, this._disposables);
    }
}
exports.HelloWorldPanel = HelloWorldPanel;
//# sourceMappingURL=HelloWorldPanel.js.map