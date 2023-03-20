import { useState } from "react";
import soundbell from "../assets/achievementBell.wav";

export function PomodoroTimerHook(){

    const [sessionLen, setSessionLen] = useState(2400)
    const [breakLen, setBreakLen] = useState(600)
    const [timer, setTimer] = useState(2400)
    const [showSettings, setShowSettings] = useState(false);
    const [sessionsLoop, setSessionsLoop] = useState(false);
      
    const handleCloseSettings = () => setShowSettings(false);
    const handleShowSettings = () => setShowSettings(true);

    const [timerMode, setTimerMode] = useState('Pomodoro Session') // or Pomodoro Break
    const [timerStatus, setTimerStatus] = useState(false)
    const [soundOn, setSoundOn] = useState(true)
    const timerBell = new Audio(soundbell.toString())

    function toggleSoundOn(){
        setSoundOn(!soundOn)
    }

    function updateSessionAndBreakLen(){
        if(localStorage.getItem('sessionLen')){
            setSessionLen(Number(localStorage.getItem('sessionLen')))
        }
        if(localStorage.getItem('breakLen')){
            setBreakLen(Number(localStorage.getItem('breakLen')))
        }

    }

    function setTimerTime(){
        if(timerMode === 'Pomodoro Session'){
            setTimer(sessionLen)
        }else if (timerMode === 'Pomodoro Break'){
            setTimer(breakLen)
        }
    }

    function startTimer(){
        
        setTimerStatus(true);

        setTimerTime();

    }



    function setSessionAndBreakLen(sessionLenStr:string, breakLenStr:string){
        
        const sessionLen = Number(sessionLenStr)*60;
        const breakLen = Number(breakLenStr)*60;
        
        setSessionLen(sessionLen);
        localStorage.setItem('sessionLen', sessionLen.toString());
        setBreakLen(breakLen);
        localStorage.setItem('breakLen', breakLen.toString());

        if(timerMode === 'Pomodoro Session'){
            setTimer(sessionLen)
            
        }else if (timerMode === 'Pomodoro Break'){
            setTimer(breakLen)
            
        }

    }

    function changeTime(){
        setTimer(timer-1)
    }

    function pauseTimer(){
        setTimerStatus(false)

    }

    function resumeTimer(){
        setTimerStatus(true)
    }

    function changeTimerModes(newMode: string){
        setTimerMode(newMode)
        setTimerTime();

    }

    function setSessionLoopMode(status:boolean){
        setSessionsLoop(status);
    }
    

    return {
        timer,
        sessionLen,
        breakLen,
        timerMode,
        startTimer,
        timerStatus,
        changeTime,
        pauseTimer,
        resumeTimer,
        changeTimerModes,
        showSettings,
        handleCloseSettings,
        handleShowSettings,
        setSessionAndBreakLen,
        sessionsLoop,
        setTimerTime,
        setSessionLoopMode,
        updateSessionAndBreakLen,
        timerBell,
        toggleSoundOn,
        soundOn
    }

}