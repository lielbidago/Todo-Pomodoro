import { useEffect, useRef } from "react";
import { Overlay, Tooltip } from "react-bootstrap";
import { IthemeColors } from "../App";
import { useBellSound } from "../hooks/useBellSound";
import { ItimerReducerAction, ItimerState, timerReducerActions } from "../hooks/useTimer";
import '../scss/timer.scss';

// interface PomodoroTimerprops{
//     timer: number,
//     timerMode: string,
//     startTimer():void,
//     timerStatus:boolean,
//     changeTime():void,
//     pauseTimer():void,
//     resumeTimer():void,
//     changeTimerModes(newMode: string):void,
//     handleShowSettings():void,
//     sessionsLoop:boolean,
//     sessionLen:number,
//     breakLen:number, 
//     setTimerTime():void,
//     updateSessionAndBreakLen():void,
//     timerBell: HTMLAudioElement,
//     toggleSoundOn():void,
//     soundOn:boolean, 
//     setLastSessionTaskCount():void,
//     calculateCurSessionRate():void,
//     themeColors: IthemeColors,
//     toggleHelpTips: boolean,
//     toggleTimerFullScreen():void,
// }

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
    updateForast():void,
    themeColors: IthemeColors,
    toggleHelpTips: boolean,
    toggleTimerFullScreen():void,
}


export function PomodoroTimer(props:PomodoroTimerprops){
    
    const {timerState, timerDispatch, handleRateTasksUpdate, 
        updateForast, themeColors,
      toggleHelpTips, toggleTimerFullScreen }
    = props;
    const {soundOn, timerBell, toggleSoundOn} = useBellSound();
    const {buttonColor} = themeColors;

    const timerTitles = useRef({
        session:'Pomodoro Session',
        break:'Pomodoro Break',
    });
    
    function playBell(){
        timerBell.play()
    }

    useEffect(()=>{
        timerDispatch({type:timerReducerActions.updateTimerState, payload:{}})
    }, []);

    useEffect(()=>{
        
        if (timerState.timer === 0 && timerState.isOn){

            if(soundOn){
                playBell()
            }

            updateForast();

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

// export function PomodoroTimer(props:PomodoroTimerprops){
    
//     const {timer, timerMode, startTimer, timerStatus,
//     changeTime, pauseTimer, resumeTimer, changeTimerModes, 
//     sessionsLoop, sessionLen, breakLen,
//      setTimerTime, updateSessionAndBreakLen, timerBell, toggleSoundOn,
//       soundOn, setLastSessionTaskCount, calculateCurSessionRate, themeColors,
//       toggleHelpTips, toggleTimerFullScreen }
//     = props
    
//     const {buttonColor} = themeColors

//     //////////
    
//     function playBell(){
//         timerBell.play()
//     }

//     useEffect(()=>{
//         updateSessionAndBreakLen()
//     }, []);

//     useEffect(()=>{
//         setTimerTime()
//     }, [sessionLen, breakLen]);

//     useEffect(()=>{
        
//         if(timer === 0 && timerStatus){

//             if(soundOn){
//                 playBell()
//             }
//             calculateCurSessionRate()
//             pauseTimer()
            

//             if(timerMode==='Pomodoro Break'){
//                 changeTimerModes('Pomodoro Session')
                                
//             }else{
//                 changeTimerModes('Pomodoro Break')
//             }

//             if(sessionsLoop){
//                 startTimer();
//             }

//         }

//         if(timerStatus){
//             const interval = setInterval(() => {
//                 changeTime()
//         }, 1000);

            
//             return () => {clearInterval(interval)};
//         }
        
//     }, [timer, timerStatus])



//     useEffect(()=>{
//         setTimerTime()
//     }, [timerMode, setTimerTime]);


//     function handleModeChange(event: React.MouseEvent<HTMLElement>){

//         if(timerMode==='Pomodoro Break'){
//             changeTimerModes('Pomodoro Session')
                            
//         }else{
//             changeTimerModes('Pomodoro Break')
//         }
//     }

//     function handleStartTimer(event: React.MouseEvent<HTMLElement>){
//         setLastSessionTaskCount()
//         startTimer()
//     }

//     const sessionTitleRef = useRef(null)
//     const soundRef = useRef(null)


//     return (
//         <div className="pomodoro-timer">
//             <div className={`timer ${buttonColor}`}>
//                 <div className="timer-a">
//                     <h5 onDoubleClick={handleModeChange} className="timer-title" ref={sessionTitleRef}>{timerMode}</h5>
//                     <Overlay target={sessionTitleRef.current} show={toggleHelpTips} placement='top'>
//                         {(props) => (
//                             <Tooltip {...props}>
//                                 title of the session,<br/> double click to change session mode
//                             </Tooltip>
//                         )} 
//                     </Overlay>
//                     <h2 className="time">{formatTimer(timer)}</h2>
//                     <div className="timerButtons">
//                         {timerStatus? <button className={`btn btn-outline-${buttonColor}`} onClick={pauseTimer}>pause</button>: 
//                         <button className={`btn btn-outline-${buttonColor}`} onClick={resumeTimer}>resume</button>}
                        
//                         <button className={`btn btn-outline-${buttonColor}`} onClick={handleStartTimer}>{timerStatus?'restart':'start'}</button>
//                     </div>
//                 </div>
//                 <div className="timer-footer" >
//                         <div className="sound">
//                             {soundOn?<img height='15' alt='volume-on' ref={soundRef} onClick={()=>{toggleSoundOn()}}
//                             src="https://img.icons8.com/metro/26/null/high-volume.png"/>:
//                             <img height='15' alt='volume-off' ref={soundRef} onClick={()=>{toggleSoundOn()}}
//                             src="https://img.icons8.com/metro/26/null/no-audio.png"/>}
//                         </div>
//                         <div className="timer-full-screen">
//                             <img height='15' alt="timer-full-screen" onClick={()=>{toggleTimerFullScreen()}} src="https://img.icons8.com/external-inkubators-detailed-outline-inkubators/25/null/external-full-screen-arrows-inkubators-detailed-outline-inkubators-3.png"/>
//                         </div>

//                 </div>
//                 <Overlay target={soundRef.current} show={toggleHelpTips} placement='top'>
//                         {(props) => (
//                             <Tooltip {...props}>
//                                 a bell would notify when the time is up
//                             </Tooltip>
//                         )} 
//                 </Overlay>


//             </div>
//         </div>
//     );
// }