import * as vscode from 'vscode';
import { formatTime, incrementTime, isRunning, timeContainter, toggle, toggleTimer } from './util/time';
import { Hello } from './util/hello';

// 引数にvscode.Extention型のcontextを持つ。
// activate関数はサーバーの起動処理。
export function activate(context: vscode.ExtensionContext) {
	// 作業中のコンソールで出力する、ヘルスチェック
	// console.log('Congratulations, your extension "time" is now active!');
	// disposable: 廃棄可能、
	// vscode.commandはvscodeの機能を呼び出すためのapi registerCommandで自分のものを登録できる。
	// エンドポイントは'time.helloWorld'でそれが呼ばれたら関数内を実行する。
	const disposable = vscode.commands.registerCommand('time.helloWorld', Hello);
	// ステータスバーに項目を作成
	// vscode.window.createStatusBarItemでアイテムを作成。
	// 第一引数に表示位置の指定、第二引数をに優先順位、これが大きければ外側に表示される。
	// 戻り値はstatsubarItemという型が返ってきて、これを2行目でpushして実際に画面に反映させる。
	const myStatusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	context.subscriptions.push(myStatusBarItem);

	const toggleCommand = vscode.commands.registerCommand('time.toggleTimer', toggle)
	context.subscriptions.push(toggleCommand)
	myStatusBarItem.command = 'time.toggleTimer';

	const intervalId = setInterval(() => {
  if (isRunning) { // 実行中のみカウントアップ
    incrementTime(timeContainter); // 実行中のみ時間を進める
    myStatusBarItem.text = `${formatTime(timeContainter)}`;
  } else {
    // 停止中はアイコンを変えるなどの演出も可能
    myStatusBarItem.text = `${isRunning ? '$(pencil)' : '$(debug-pause)'} ${formatTime(timeContainter)}`;
  }
  myStatusBarItem.show();
}, 1000);

	context.subscriptions.push({
    dispose: () => clearInterval(intervalId)
  });
	// contextは起動したときに渡してくれるストレージやパス、いつ終わるかの管理、
	// subscriptionはdispose()関数を行う（リソースの解放）
}

export function deactivate() {}
