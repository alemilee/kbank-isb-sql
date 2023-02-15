// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

//import { DepNodeProvider, Dependency } from './views/exploer/nodeDependencies';
//import { JsonOutlineProvider } from './views/exploer/jsonOutline';
//import { FtpExplorer } from './views/exploer/ftpExplorer';
//import { FileExplorer } from './views/exploer/fileExplorer';
import { SqlconfigExplorer } from './views/explorer/sqlconfigExplorer';
import { SqlmapDataExplorer,Dependency } from './views/explorer/sqlmapDataExplorer';
import { TestViewDragAndDrop } from './views/explorer/testViewDragAndDrop';
import { TestView } from './views/explorer/testView';
import { showQuickPick, showInputBox } from './commands/basicInput';
import { multiStepInput } from './commands/multiStepInput';
import { quickOpen } from './commands/quickOpen';

import { HelloWorldPanel } from "./views/webview/HelloWorldPanel";


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
const rootPath = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0))
		? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "kbank-isb-sql" is now active!');

		// Samples of `window.registerTreeDataProvider`
	// const nodeDependenciesProvider = new DepNodeProvider(rootPath);
	// vscode.window.registerTreeDataProvider('nodeDependencies', nodeDependenciesProvider);

	const sqlmapProvider = new SqlmapDataExplorer(rootPath);
	vscode.window.registerTreeDataProvider('sqlmapExplorer',sqlmapProvider);
	// vscode.window.createTreeView('sqlmapExplorer',{
	// 	treeDataProvider: new SqlmapDataExplorer(rootPath)
	// });
	vscode.commands.registerCommand('sqlmapExplorer.refreshEntry', () => sqlmapProvider.refresh());
	vscode.commands.registerCommand('extension.openPackageOnNpm', moduleName => vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`https://www.npmjs.com/package/${moduleName}`)));
	vscode.commands.registerCommand('sqlmapExplorer.addEntry', () => vscode.window.showInformationMessage(`Successfully called add entry.`));
	vscode.commands.registerCommand('sqlmapExplorer.editEntry', (node: Dependency) => vscode.window.showInformationMessage(`Successfully called edit entry on ${node.label}.`));
	vscode.commands.registerCommand('sqlmapExplorer.deleteEntry', (node: Dependency) => vscode.window.showInformationMessage(`Successfully called delete entry on ${node.label}.`));

	// const jsonOutlineProvider = new JsonOutlineProvider(context);
	// vscode.window.registerTreeDataProvider('jsonOutline', jsonOutlineProvider);
	// vscode.commands.registerCommand('jsonOutline.refresh', () => jsonOutlineProvider.refresh());
	// vscode.commands.registerCommand('jsonOutline.refreshNode', offset => jsonOutlineProvider.refresh(offset));
	// vscode.commands.registerCommand('jsonOutline.renameNode', args => {
	// 	let offset = undefined;
	// 	if (args.selectedTreeItems && args.selectedTreeItems.length) {
	// 		offset = args.selectedTreeItems[0];
	// 	} else if (typeof args === 'number') {
	// 		offset = args;
	// 	}
	// 	if (offset) {
	// 		jsonOutlineProvider.rename(offset);
	// 	}
	// });
	
	// vscode.commands.registerCommand('extension.openJsonSelection', range => jsonOutlineProvider.select(range));
	
	context.subscriptions.push(vscode.commands.registerCommand('samples.quickInput', async () => {
		const options: { [key: string]: (context: vscode.ExtensionContext) => Promise<void> } = {
			showQuickPick,
			showInputBox,
			multiStepInput,
			quickOpen,
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
	// new FtpExplorer(context);
	// new FileExplorer(context);
	new SqlconfigExplorer(context);
	

	// Test View
	new TestView(context);

	// Drag and Drop proposed API sample
	// This check is for older versions of VS Code that don't have the most up-to-date tree drag and drop API proposal.
	if (typeof vscode.DataTransferItem === 'function') {
		new TestViewDragAndDrop(context);
	}
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('kbank-isb-sql.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from kbank_isb_sql!');
		HelloWorldPanel.render(context.extensionUri);

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

// This method is called when your extension is deactivated
export function deactivate() {}
