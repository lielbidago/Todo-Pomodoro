import { useReducer } from "react";
import {ItimerState, ItimerReducerAction} from './useTimerTypes';

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


