import { useState } from "react";

export function PomodoroTimerHook(){

    const [sessionLen, setSessionLen] = useState(10)
    const [breakLen, setBreakLen] = useState(5)
    const [timer, setTimer] = useState(null)
    const [showEditTimer, setShowEditTimer] = useState(false);
      
    const handleCloseEditTimer = () => setShowEditTimer(false);
    const handleShowEditTimer = () => setShowEditTimer(true);

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
        showEditTimer,
        handleCloseEditTimer,
        handleShowEditTimer
    }

}