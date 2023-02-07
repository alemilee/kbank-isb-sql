"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const nodeDependencies_1 = require("./nodeDependencies");
const jsonOutline_1 = require("./jsonOutline");
const ftpExplorer_1 = require("./ftpExplorer");
const fileExplorer_1 = require("./fileExplorer");
const testViewDragAndDrop_1 = require("./testViewDragAndDrop");
const testView_1 = require("./testView");
const HelloWorldPanel_1 = require("./panels/HelloWorldPanel");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    const rootPath = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0))
        ? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "kbank-isb-sql" is now active!');
    // Samples of `window.registerTreeDataProvider`
    const nodeDependenciesProvider = new nodeDependencies_1.DepNodeProvider(rootPath);
    vscode.window.registerTreeDataProvider('nodeDependencies', nodeDependenciesProvider);
    vscode.commands.registerCommand('nodeDependencies.refreshEntry', () => nodeDependenciesProvider.refresh());
    vscode.commands.registerCommand('extension.openPackageOnNpm', moduleName => vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`https://www.npmjs.com/package/${moduleName}`)));
    vscode.commands.registerCommand('nodeDependencies.addEntry', () => vscode.window.showInformationMessage(`Successfully called add entry.`));
    vscode.commands.registerCommand('nodeDependencies.editEntry', (node) => vscode.window.showInformationMessage(`Successfully called edit entry on ${node.label}.`));
    vscode.commands.registerCommand('nodeDependencies.deleteEntry', (node) => vscode.window.showInformationMessage(`Successfully called delete entry on ${node.label}.`));
    const jsonOutlineProvider = new jsonOutline_1.JsonOutlineProvider(context);
    vscode.window.registerTreeDataProvider('jsonOutline', jsonOutlineProvider);
    vscode.commands.registerCommand('jsonOutline.refresh', () => jsonOutlineProvider.refresh());
    vscode.commands.registerCommand('jsonOutline.refreshNode', offset => jsonOutlineProvider.refresh(offset));
    vscode.commands.registerCommand('jsonOutline.renameNode', args => {
        let offset = undefined;
        if (args.selectedTreeItems && args.selectedTreeItems.length) {
            offset = args.selectedTreeItems[0];
        }
        else if (typeof args === 'number') {
            offset = args;
        }
        if (offset) {
            jsonOutlineProvider.rename(offset);
        }
    });
    vscode.commands.registerCommand('extension.openJsonSelection', range => jsonOutlineProvider.select(range));
    // Samples of `window.createView`
    new ftpExplorer_1.FtpExplorer(context);
    new fileExplorer_1.FileExplorer(context);
    // Test View
    new testView_1.TestView(context);
    // Drag and Drop proposed API sample
    // This check is for older versions of VS Code that don't have the most up-to-date tree drag and drop API proposal.
    if (typeof vscode.DataTransferItem === 'function') {
        new testViewDragAndDrop_1.TestViewDragAndDrop(context);
    }
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('kbank-isb-sql.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from kbank_isb_sql!');
        HelloWorldPanel_1.HelloWorldPanel.render(context.extensionUri);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map