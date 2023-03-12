import { useState } from "react";

export function PomodoroTimerHook(){

    const [sessionLen, setSessionLen] = useState(10)
    const [breakLen, setBreakLen] = useState(5)
    const [timer, setTimer] = useState(null)
    const [showSettings, setShowSettings] = useState(false);
      
    const handleCloseSettings = () => setShowSettings(false);
    const handleShowSettings = () => setShowSettings(true);

    const [timerMode, setTimerMode] = useState('Pomodoro Session') // or Pomodoro Break
    const [timerStatus, setTimerStatus] = useState(false)


    function startTimer(){
        
        setTimerStatus(true)

        if(timerMode === 'Pomodoro Session'){
            setTimer(sessionLen)
        }else if (timerMode === 'Pomodoro Break'){
            setTimer(breakLen)
        }

    }

    function setSessionAndBreakLen(sessionLen:string, breakLen:string){
        setSessionLen(Number(sessionLen)*60);
        setBreakLen(Number(breakLen)*60);
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
        setSessionAndBreakLen
    }

}