import * as vscode from 'vscode';

type TimeContainer = {
		hours: number;
		minutes: number;
		seconds: number;
	}

	export let timeContainter: TimeContainer = {
		hours: 0,
		minutes: 0,
		seconds: 0
	}

	export let isRunning: boolean = true;

	export const toggleTimer = () => {
		isRunning = !isRunning;
		return isRunning;
	}

	export const incrementTime = (time: TimeContainer) => {
		time.seconds++;
		if (time.seconds == 60){
			time.minutes++;
			time.seconds = 0;
		}
		if(time.minutes == 60){
			time.hours++;
			time.minutes = 0;
		}
	}

	// util/time.ts 内の formatTime を修正
export const formatTime = (time: TimeContainer) => {
  // 数字を2桁の文字列に変換するヘルパー
  const p = (n: number) => n.toString().padStart(2, '0');

  const hh = p(time.hours);
  const mm = p(time.minutes);
  const ss = p(time.seconds);

  if (time.hours === 0) {
    return `${mm}:${ss}`;
  } else {
    return `${hh}:${mm}:${ss}`;
  }
};

	export const toggle = () => {
		const running: boolean = toggleTimer();
		const status = running ? "再開" : "一時停止"
		vscode.window.showInformationMessage(`タイマーを${status}しました`);
	}