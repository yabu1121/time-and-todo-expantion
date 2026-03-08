import * as vscode from 'vscode';

export const Hello =  () => {
		// vscode.windowでvscodeのないのwindowのライブラリ、
		// showInformationMessageは右下のトーストメッセージとして表示される。
		vscode.window.showInformationMessage('Hello World!');
	}