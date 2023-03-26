import { useEffect } from "react";
import soundbell from "../assets/achievementBell.wav";


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
    sessionLen:number,
    breakLen:number, 
    setTimerTime():void,
    updateSessionAndBreakLen():void,
    timerBell: HTMLAudioElement,
    toggleSoundOn():void,
    soundOn:boolean, 
    setLastSessionTaskCount():void,
    calculateCurSessionRate():void
}

function formatTimer(timer: number){
    let hours = Math.floor(timer/3600)
    let minutes = Math.floor((timer-hours*3600)/60)
    let seconds = Math.floor(timer-(minutes*60+hours*3600))

    return `${hours}:`.padStart(3,'0') +
     `${minutes}:`.padStart(3,'0') + 
      `${seconds}`.padStart(2,'0');
}


export function PomodoroTimer(props:PomodoroTimer){
    
    const {timer, timerMode, startTimer, timerStatus,
    changeTime, pauseTimer, resumeTimer, changeTimerModes, 
    sessionsLoop, sessionLen, breakLen,
     setTimerTime, updateSessionAndBreakLen, timerBell, toggleSoundOn,
      soundOn, setLastSessionTaskCount, calculateCurSessionRate }
    = props
    
    function playBell(){
        timerBell.play()
    }

    useEffect(()=>{
        updateSessionAndBreakLen()
    }, []);

    useEffect(()=>{
        setTimerTime()
    }, [sessionLen, breakLen]);

    useEffect(()=>{
        
        if(timer === 0 && timerStatus){

            if(soundOn){
                playBell()
            }
            calculateCurSessionRate()
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



    useEffect(()=>{
        setTimerTime()
    }, [timerMode])




    function handleModeChange(event: React.MouseEvent<HTMLElement>){

        if(timerMode==='Pomodoro Break'){
            changeTimerModes('Pomodoro Session')
                            
        }else{
            changeTimerModes('Pomodoro Break')
        }
    }

    function handleStartTimer(event: React.MouseEvent<HTMLElement>){
        setLastSessionTaskCount()
        startTimer()
    }

    return (
        <div className="pomodoro-timer">
            <div className="timer">
                <div className="timer-a">
                    <h5 onDoubleClick={handleModeChange} className="timer-title">{timerMode}</h5>
                    <h2 className="time">{formatTimer(timer)}</h2>
                    <div className="timerButtons">
                        {timerStatus? <button className='btn btn-outline-light' onClick={pauseTimer}>pause</button>: 
                        <button className='btn btn-outline-light' onClick={resumeTimer}>resume</button>}
                        
                        <button className='btn btn-outline-light' onClick={handleStartTimer}>{timerStatus?'restart':'start'}</button>
                    </div>
                </div>
                <div className="sound">
                🕭
                        <label className="switch">
                            <input type='checkbox' checked={soundOn} onChange={()=>{toggleSoundOn()}}></input>
                            <span className="slider round"></span>
                        </label>
                </div>

            </div>
        </div>
    );
}