import { useEffect, useRef } from "react";
import { Overlay, Tooltip } from "react-bootstrap";
import '../scss/timer.scss';

interface PomodoroTimerprops{
    timer: number,
    timerMode: string,
    startTimer():void,
    timerStatus:boolean,
    changeTime():void,
    pauseTimer():void,
    resumeTimer():void,
    changeTimerModes(newMode: string):void,
    handleShowSettings():void,
    sessionsLoop:boolean,
    sessionLen:number,
    breakLen:number, 
    setTimerTime():void,
    updateSessionAndBreakLen():void,
    timerBell: HTMLAudioElement,
    toggleSoundOn():void,
    soundOn:boolean, 
    setLastSessionTaskCount():void,
    calculateCurSessionRate():void,
    themeColors,
    toggleHelpTips: boolean,
    toggleTimerFullScreen():void,
}

function formatTimer(timer: number){
    let hours = Math.floor(timer/3600)
    let minutes = Math.floor((timer-hours*3600)/60)
    let seconds = Math.floor(timer-(minutes*60+hours*3600))

    return `${hours}:`.padStart(3,'0') +
     `${minutes}:`.padStart(3,'0') + 
      `${seconds}`.padStart(2,'0');
}


export function PomodoroTimer(props:PomodoroTimerprops){
    
    const {timer, timerMode, startTimer, timerStatus,
    changeTime, pauseTimer, resumeTimer, changeTimerModes, 
    sessionsLoop, sessionLen, breakLen, themeColors,
     setTimerTime, updateSessionAndBreakLen, timerBell, toggleSoundOn,
      soundOn, setLastSessionTaskCount, calculateCurSessionRate,
      toggleHelpTips, toggleTimerFullScreen }
    = props
    
    const {buttonColor} = themeColors;

    //////////
    
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

    const sessionTitleRef = useRef(null)
    const soundRef = useRef(null)


    return (
        <div className="pomodoro-timer">
            <div className={`timer ${buttonColor}`}>
                <div className="timer-a">
                    <h5 onDoubleClick={handleModeChange} className="timer-title" ref={sessionTitleRef}>{timerMode}</h5>
                    <Overlay target={sessionTitleRef.current} show={toggleHelpTips} placement='top'>
                        {(props) => (
                            <Tooltip {...props}>
                                title of the session,<br/> double click to change session mode
                            </Tooltip>
                        )} 
                    </Overlay>
                    <h2 className="time">{formatTimer(timer)}</h2>
                    <div className="timerButtons">
                        {timerStatus? <button className={`btn btn-outline-${buttonColor}`} onClick={pauseTimer}>pause</button>: 
                        <button className={`btn btn-outline-${buttonColor}`} onClick={resumeTimer}>resume</button>}
                        
                        <button className={`btn btn-outline-${buttonColor}`} onClick={handleStartTimer}>{timerStatus?'restart':'start'}</button>
                    </div>
                </div>
                <div className="timer-footer" >
                        <div className="sound">
                            {soundOn?<img height='15' ref={soundRef} onClick={()=>{toggleSoundOn()}}
                            src="https://img.icons8.com/metro/26/null/high-volume.png"/>:
                            <img height='15' ref={soundRef} onClick={()=>{toggleSoundOn()}}
                            src="https://img.icons8.com/metro/26/null/no-audio.png"/>}
                        </div>
                        <div className="timer-full-screen">
                            <img height='15' onClick={()=>{toggleTimerFullScreen()}} src="https://img.icons8.com/external-inkubators-detailed-outline-inkubators/25/null/external-full-screen-arrows-inkubators-detailed-outline-inkubators-3.png"/>
                        </div>

                </div>
                <Overlay target={soundRef.current} show={toggleHelpTips} placement='top'>
                        {(props) => (
                            <Tooltip {...props}>
                                a bell would notify when the time is up
                            </Tooltip>
                        )} 
                </Overlay>


            </div>
        </div>
    );
}