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

	export const formatTime = (time: TimeContainer) => {
	 	if (!time.hours && !time.minutes){
      return `$(watch)経過時間${time.seconds}秒`
		}else if (!time.hours){
		  return `$(watch)経過時間${time.minutes}分${time.seconds}秒`
		}else {
			return `$(watch)経過時間${time.hours}時間${time.minutes}分${time.seconds}秒`
		}
	}

	export const toggle = () => {
		const running: boolean = toggleTimer();
		const status = running ? "再開" : "一時停止"
		vscode.window.showInformationMessage(`タイマーを${status}しました`);
	}