import { useEffect } from "react";
import { ProgressBarP } from "./prograssBar";


interface PomodoroTimer{
    timer: number,
    timerMode: string,
    startTimer():void,
    timerStatus:boolean,
    changeTime():void,
    pauseTimer():void,
    resumeTimer():void,
    changeTimerModes(newMode: string):void,
    handleShowSettings():void,
    progressValue():number,
    sessionsLoop:boolean,
    
    
}

function formatTimer(timer: number){
    let hours = Math.floor(timer/3600)
    let minutes = Math.floor((timer-hours*3600)/60)
    let seconds = Math.floor(timer-(minutes*60+hours*3600))

    return `${hours}:`.padStart(3,'0') +
     `${minutes}:`.padStart(3,'0') + 
      `${seconds}`.padStart(2,'0');
}

//'Pomodoro Session'

export function PomodoroTimer(props:PomodoroTimer){
    
    const {timer, timerMode, startTimer, timerStatus,
        changeTime, pauseTimer, resumeTimer, changeTimerModes, progressValue, 
        sessionsLoop } = props

    const I = useEffect(()=>{
        
        if(timer === 0 && timerStatus){

            pauseTimer()

            if(timerMode==='Pomodoro Break'){
                changeTimerModes('Pomodoro Session')
                                
            }else{
                changeTimerModes('Pomodoro Break')
            }

            if(sessionsLoop){
                startTimer();
            }


        }

        if(timerStatus){
            const interval = setInterval(() => {
                changeTime()
            }, 1000);

            
            return () => {clearInterval(interval)};
        }
    }, [timer, timerStatus])

    return (
        <div className="pomodoro-timer">
            <div className="timer">
                <h5 className="timer-title">{timerMode}</h5>
                <h2 className="time">{formatTimer(timer)}</h2>
                <div className="timerButtons">
                    {timerStatus? <button className='btn btn-outline-light' onClick={pauseTimer}>pause</button>: 
                    <button className='btn btn-outline-light' onClick={resumeTimer}>resume</button>}
                    
                    <button className='btn btn-outline-light' onClick={startTimer}>{timerStatus?'restart':'start'}</button>
                 </div>
            </div>

            <ProgressBarP progressValue={progressValue()}/>
            
        </div>
    );
}