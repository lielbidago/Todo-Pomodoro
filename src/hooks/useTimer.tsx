import { useReducer } from "react";
import {ItimerState, ItimerReducerAction} from './useTimerTypes'




export const timerMods = {
    session:'session',
    break:'break',
} as const

export const timerReducerActions = {
    startTimer:'startTimer',
    setSession:'setSession',
    setBreak:'setBreak',
    changeTime:'changeTime',
    pauseTimer:'pauseTimer',
    resumeTimer:'resumeTimer',
    changeTimerModes:'changeTimerModes',
    setLoopMode:'setLoopMode',
    updateTimerState:'updateTimerState'

} as const

export type TtimerReducerActions = keyof typeof timerReducerActions



function timerReducer(state:ItimerState, action:ItimerReducerAction):ItimerState{
    switch (action.type){

        case timerReducerActions.changeTime:

            return {...state, timer: state.timer-1};

        case timerReducerActions.changeTimerModes:

            return {...state, 
                curMode: state.curMode === 'break'? 'session':'break',
                timer:state[state.curMode]
            };

        case timerReducerActions.pauseTimer || timerReducerActions.resumeTimer:
            return {...state, isOn:!state.isOn};

        case timerReducerActions.setBreak:
            localStorage.setItem('breakLen', (action.payload.newBreakMinutes!*60).toString());
            return {...state, break: action.payload.newBreakMinutes!*60, timer:state[state.curMode]};

        case timerReducerActions.setSession:
            localStorage.setItem('sessionLen', (action.payload.newSessionMinutes!*60).toString());
            return {...state, session: action.payload.newSessionMinutes!*60, timer:state[state.curMode]};

        case timerReducerActions.setLoopMode:
            return {...state, isLooped: !action.payload.isLooped }

        case timerReducerActions.startTimer:
            return {...state, timer: state[state.curMode], isOn: true }

        case timerReducerActions.updateTimerState:
            if(localStorage.getItem('sessionLen')){
                state.session = Number(localStorage.getItem('sessionLen'))
            }

            if(localStorage.getItem('breakLen')){
                state.break = Number(localStorage.getItem('breakLen'))
            }

            state.timer = state[state.curMode];

            return {...state}

        default:

            throw Error('unfamiliar timer action')
    }
}


export function useTimer(){
    const defaultState: ItimerState = 
    {
        isOn:false, 
        session:2400, 
        break:600, 
        timer:2400, 
        curMode: timerMods.session,
        isLooped:false
    }

    const [timerState, timerDispatch] = useReducer(timerReducer, defaultState);


    return {timerState, timerDispatch}

}



// export function usePomodoroTimerHook(){

//     const [sessionLen, setSessionLen] = useState(2400);
//     const [breakLen, setBreakLen] = useState(600);

//     const [timer, setTimer] = useState(2400);


//     const [sessionsLoop, setSessionsLoop] = useState(false);

//     const [timerMode, setTimerMode] = useState('Pomodoro Session') // or Pomodoro Break
//     const [timerStatus, setTimerStatus] = useState(false)


//     const [soundOn, setSoundOn] = useState(true)
    
//     const timerBell = useMemo(()=> new Audio(soundbell.toString()), [soundbell])

//     function toggleSoundOn(){
//         setSoundOn(!soundOn)
//     }

//     function updateSessionAndBreakLen(){
//         if(localStorage.getItem('sessionLen')){
//             setSessionLen(Number(localStorage.getItem('sessionLen')))
//         }
//         if(localStorage.getItem('breakLen')){
//             setBreakLen(Number(localStorage.getItem('breakLen')))
//         }

//     }

//     function setTimerTime(){
//         if(timerMode === 'Pomodoro Session'){
//             setTimer(sessionLen)
//         }else if (timerMode === 'Pomodoro Break'){
//             setTimer(breakLen)
//         }
//     }

//     function startTimer(){
//         setTimerStatus(true);
//         setTimerTime();
//     }



//     function setSessionAndBreakLen(sessionLenStr:string, breakLenStr:string){
        
//         const sessionLen = Number(sessionLenStr)*60;
//         const breakLen = Number(breakLenStr)*60;
        
//         setSessionLen(sessionLen);
//         localStorage.setItem('sessionLen', sessionLen.toString());
//         setBreakLen(breakLen);
//         localStorage.setItem('breakLen', breakLen.toString());

//         if(timerMode === 'Pomodoro Session'){
//             setTimer(sessionLen)
            
//         }else if (timerMode === 'Pomodoro Break'){
//             setTimer(breakLen)
            
//         }

//     }

//     function changeTime(){
//         setTimer(timer-1)
//     }

//     function pauseTimer(){
//         setTimerStatus(false)

//     }

//     function resumeTimer(){
//         setTimerStatus(true)
//     }

//     function changeTimerModes(newMode: string){
//         setTimerMode(newMode)
//         setTimerTime();

//     }

//     function setSessionLoopMode(status:boolean){
//         setSessionsLoop(status);
//     }
    

//     return {
//         timer,
//         sessionLen,
//         breakLen,
//         timerMode,
//         startTimer,
//         timerStatus,
//         changeTime,
//         pauseTimer,
//         resumeTimer,
//         changeTimerModes,
//         setSessionAndBreakLen,
//         sessionsLoop,
//         setTimerTime,
//         setSessionLoopMode,
//         updateSessionAndBreakLen,
//         timerBell,
//         toggleSoundOn,
//         soundOn
//     }

// }