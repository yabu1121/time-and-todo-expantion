import * as vscode from 'vscode';

// 引数にvscode.Extention型のcontextを持つ。
// activate関数はサーバーの起動処理。
export function activate(context: vscode.ExtensionContext) {
	// 作業中のコンソールで出力する、ヘルスチェック
	console.log('Congratulations, your extension "time" is now active!');
	// disposable: 廃棄可能、
	// vscode.commandはvscodeの機能を呼び出すためのapi registerCommandで自分のものを登録できる。
	// エンドポイントは'time.helloWorld'でそれが呼ばれたら関数内を実行する。
	const disposable = vscode.commands.registerCommand('time.helloWorld', () => {
		// vscode.windowでvscodeのないのwindowのライブラリ、
		// showInformationMessageは右下のトーストメッセージとして表示される。
		vscode.window.showInformationMessage('Hello World from time!');
	});

	// contextは起動したときに渡してくれるストレージやパス、いつ終わるかの管理、
	// subscriptionはdispose()関数を行う（リソースの解放）
	context.subscriptions.push(disposable);
}

export function deactivate() {}
