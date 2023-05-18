import { useEffect, useRef } from "react";
import { Overlay, Tooltip } from "react-bootstrap";

import { useBellSound } from "../hooks/useBellSound";
import { timerReducerActions } from "../hooks/useTimer";
import { ItimerReducerAction, ItimerState } from "../hooks/useTimerTypes";

import '../scss/timer.scss';
import { IthemeColors } from "../hooks/useThemeTypes";


function formatTimer(timer: number){
    let hours = Math.floor(timer/3600)
    let minutes = Math.floor((timer-hours*3600)/60)
    let seconds = Math.floor(timer-(minutes*60+hours*3600))

    return `${hours}:`.padStart(3,'0') +
     `${minutes}:`.padStart(3,'0') + 
      `${seconds}`.padStart(2,'0');
}

interface PomodoroTimerprops{
    timerState:ItimerState,
    timerDispatch(action:ItimerReducerAction):void
    handleRateTasksUpdate():void,
    updateForcast():void,
    themeColors: IthemeColors,
    toggleHelpTips: boolean,
    toggleTimerFullScreen():void,
}


export function PomodoroTimer(props:PomodoroTimerprops){
    
    const {timerState, timerDispatch, handleRateTasksUpdate, 
        updateForcast, themeColors,
      toggleHelpTips, toggleTimerFullScreen }
    = props;
    const {soundOn, timerBell, toggleSoundOn} = useBellSound();
    const {buttonColor} = themeColors;
    
    const timerOptions = {
        session:'Pomodoro Session',
        break:'Pomodoro Break',
    }//left it as not const since maybe inthe future i will add timerMods name customization. instead 'Pomodoro Session' - 'Study time'

    const timerTitles = useRef(timerOptions);
    
    function playBell(){
        timerBell.play()
    }

    useEffect(()=>{
        timerDispatch({type:timerReducerActions.updateTimerState, payload:{}})
    }, [timerDispatch]);

    useEffect(()=>{
        
        if (timerState.timer === 0 && timerState.isOn){

            if(soundOn){
                playBell()
            }

            updateForcast();

            timerDispatch({type:timerReducerActions.pauseTimer, payload:{}})
            timerDispatch({type:timerReducerActions.changeTimerModes, payload:{}})

            if(timerState.isLooped){
                timerDispatch({type:timerReducerActions.startTimer, payload:{}})
            }

        }

        if(timerState.isOn){
            const interval = setInterval(() => {
                timerDispatch({type:timerReducerActions.changeTime, payload:{}})
            }, 1000);

            
            return () => {clearInterval(interval)};
        }
        
    }, [timerState.timer, timerState.isOn])


    function handleModeChange(event: React.MouseEvent<HTMLElement>){
        timerDispatch({type:timerReducerActions.changeTimerModes, payload:{}})
    }

    function handleStartTimer(event: React.MouseEvent<HTMLElement>){
        handleRateTasksUpdate()
        timerDispatch({type:timerReducerActions.startTimer, payload:{}})
    }

    function handleTimerChange(event: React.MouseEvent<HTMLElement>){
        timerDispatch({type:timerReducerActions.pauseTimer, payload:{}})

    }

    const sessionTitleRef = useRef(null)
    const soundRef = useRef(null)


    return (
        <div className="pomodoro-timer">
            <div className={`timer ${buttonColor}`}>
                <div className="timer-a">
                    <h5 onDoubleClick={handleModeChange} className="timer-title" ref={sessionTitleRef}>{timerTitles.current[timerState.curMode]}</h5>
                    <Overlay target={sessionTitleRef.current} show={toggleHelpTips} placement='top'>
                        {(props) => (
                            <Tooltip {...props}>
                                title of the session,<br/> double click to change session mode
                            </Tooltip>
                        )} 
                    </Overlay>
                    <h2 className="time">{formatTimer(timerState.timer)}</h2>
                    <div className="timerButtons">
                        {timerState.isOn? <button className={`btn btn-outline-${buttonColor}`} onClick={handleTimerChange}>pause</button>: 
                        <button className={`btn btn-outline-${buttonColor}`} onClick={handleTimerChange}>resume</button>}
                        
                        <button className={`btn btn-outline-${buttonColor}`} onClick={handleStartTimer}>{timerState.isOn?'restart':'start'}</button>
                    </div>
                </div>
                <div className="timer-footer" >
                        <div className="sound">
                            {soundOn?<img height='15' alt='volume-on' ref={soundRef} onClick={()=>{toggleSoundOn()}}
                            src="https://img.icons8.com/metro/26/null/high-volume.png"/>:
                            <img height='15' alt='volume-off' ref={soundRef} onClick={()=>{toggleSoundOn()}}
                            src="https://img.icons8.com/metro/26/null/no-audio.png"/>}
                        </div>
                        <div className="timer-full-screen">
                            <img height='15' alt="timer-full-screen" onClick={()=>{toggleTimerFullScreen()}} src="https://img.icons8.com/external-inkubators-detailed-outline-inkubators/25/null/external-full-screen-arrows-inkubators-detailed-outline-inkubators-3.png"/>
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
