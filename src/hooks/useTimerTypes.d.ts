
import {timerMods, TtimerReducerActions} from './useTimer'

export type TtimerMods = keyof typeof timerMods;

export interface ItimerState{
    isOn:boolean,
    session:number,
    break:number,
    timer:number,
    curMode:TtimerMods,
    isLooped:boolean
}

export interface ItimerReducerAction{
    type:TtimerReducerActions,
    payload:{
        newSessionMinutes?: number,
        newBreakMinutes?: number,
        isLooped?:boolean
    }
}