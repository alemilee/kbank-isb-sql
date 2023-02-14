"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const nodeDependencies_1 = require("./views/exploer/nodeDependencies");
const jsonOutline_1 = require("./views/exploer/jsonOutline");
const ftpExplorer_1 = require("./views/exploer/ftpExplorer");
const fileExplorer_1 = require("./views/exploer/fileExplorer");
const testViewDragAndDrop_1 = require("./views/exploer/testViewDragAndDrop");
const testView_1 = require("./views/exploer/testView");
const basicInput_1 = require("./commands/basicInput");
const multiStepInput_1 = require("./commands/multiStepInput");
const quickOpen_1 = require("./commands/quickOpen");
const HelloWorldPanel_1 = require("./views/webview/HelloWorldPanel");
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
    context.subscriptions.push(vscode.commands.registerCommand('samples.quickInput', async () => {
        const options = {
            showQuickPick: basicInput_1.showQuickPick,
            showInputBox: basicInput_1.showInputBox,
            multiStepInput: multiStepInput_1.multiStepInput,
            quickOpen: quickOpen_1.quickOpen,
        };
        const quickPick = vscode.window.createQuickPick();
        quickPick.items = Object.keys(options).map(label => ({ label }));
        quickPick.onDidChangeSelection(selection => {
            if (selection[0]) {
                options[selection[0].label](context)
                    .catch(console.error);
            }
        });
        quickPick.onDidHide(() => quickPick.dispose());
        quickPick.show();
    }));
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
    context.subscriptions.push(vscode.commands.registerCommand('getting-started-sample.runCommand', async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        vscode.commands.executeCommand('getting-started-sample.sayHello', vscode.Uri.joinPath(context.extensionUri, 'sample-folder'));
    }));
    context.subscriptions.push(vscode.commands.registerCommand('getting-started-sample.changeSetting', async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        vscode.workspace.getConfiguration('getting-started-sample').update('sampleSetting', true);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('getting-started-sample.setContext', async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        vscode.commands.executeCommand('setContext', 'gettingStartedContextKey', true);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('getting-started-sample.sayHello', () => {
        vscode.window.showInformationMessage('Hello');
    }));
    context.subscriptions.push(vscode.commands.registerCommand('getting-started-sample.viewSources', () => {
        return { openFolder: vscode.Uri.joinPath(context.extensionUri, 'src') };
    }));
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map