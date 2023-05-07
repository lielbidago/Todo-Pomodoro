import { useMemo, useState } from "react";
import soundbell from "../assets/achievementBell.wav";

const timerMods = {
    session:'Pomodoro Session',
    break:'Pomodoro Break',
} //left it as not const since maybe inthe future i will add timerMods name customization. instead 'Pomodoro Session' - 'Study time'

type TtimerMods = keyof typeof timerMods

interface ItimerState{
    isOn:boolean,
    session:number,
    break:number,
    curTime:number,
    curMode:TtimerMods,
    isLooped:boolean
}

const timerReducerActions = {
    startTimer:'startTimer',
    setSession:'setSession',
    setBreak:'setBreak',
    changeTime:'changeTime',
    pauseTimer:'pauseTimer',
    resumeTimer:'resumeTimer',
    changeTimerModes:'changeTimerModes',
    setLoopMode:'setLoopMode'

} as const

type TtimerReducerActions = keyof typeof timerReducerActions

interface ItimerReducerAction{
    type:TtimerReducerActions,
    payload:{
        newSessionMin?: number,
        newBreakMin?: number,
        isLooped?:boolean
    }
}

function timerReducer(state:ItimerState, action:ItimerReducerAction):ItimerState{
    switch (action.type){

        case timerReducerActions.changeTime:
            return {...state, curTime: state.curTime-1};

        case timerReducerActions.changeTimerModes:

            return {...state, 
                curMode: state.curMode === 'break'? 'session':'break',
                curTime:state[state.curMode]
            };

        case timerReducerActions.pauseTimer || timerReducerActions.resumeTimer:
            return {...state, isOn:!state.isOn};

        case timerReducerActions.setBreak:
            localStorage.setItem('breakLen', (action.payload.newBreakMin!*60).toString());
            return {...state, break: action.payload.newBreakMin!*60};

        case timerReducerActions.setSession:
            localStorage.setItem('sessionLen', (action.payload.newSessionMin!*60).toString());
            return {...state, session: action.payload.newSessionMin!*60};

        case timerReducerActions.setLoopMode:
            return {...state, isLooped: action.payload.isLooped!}

        case timerReducerActions.startTimer:
            return {...state, curTime: state[state.curMode], isOn: true }
        default:

            throw Error('unfamiliar timer action')
    }
}


export function useTimer(){
    
}

export function usePomodoroTimerHook(){

    const [sessionLen, setSessionLen] = useState(2400);
    const [breakLen, setBreakLen] = useState(600);

    const [timer, setTimer] = useState(2400);


    const [sessionsLoop, setSessionsLoop] = useState(false);

    const [timerMode, setTimerMode] = useState('Pomodoro Session') // or Pomodoro Break
    const [timerStatus, setTimerStatus] = useState(false)


    const [soundOn, setSoundOn] = useState(true)
    
    const timerBell = useMemo(()=> new Audio(soundbell.toString()), [soundbell])

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