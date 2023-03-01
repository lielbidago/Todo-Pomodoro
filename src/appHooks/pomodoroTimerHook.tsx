import { useState } from "react";

export function PomodoroTimerHook(){

    const [sessionLen, setSessionLen] = useState(2400)
    const [breakLen, setBreakLen] = useState(1200)
    const [timer, setTimer] = useState(0)

    const [timerMode, setTimerMode] = useState('Pomodoro Session') // or Pomodoro Break
    const [timerStatus, setTimerStatus] = useState(false)


    function startTimer(){
        
        setTimerStatus(true)

        alert('started timer')
        if(timerMode === 'Pomodoro Session'){
            setTimer(sessionLen)
        }else if (timerMode === 'Pomodoro Break'){
            setTimer(breakLen)
        }

    }

    // function getSessionAndBreakLen(){

    // }

    function changeTime(){
        setTimer(timer-1)
    }

    function pauseTimer(){
        setTimerStatus(false)

    }

    function resumeTimer(){
        setTimerStatus(true)
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
        resumeTimer
    }

}