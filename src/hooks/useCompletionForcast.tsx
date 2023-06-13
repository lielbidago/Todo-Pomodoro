import { useReducer, useRef } from "react";


export const forcastReducerActions = {
    updateCompletionForcastEval:'updateCompletionForcastEval'
} as const 

export type TforcastReducerActions = keyof typeof forcastReducerActions

export interface IforcastReducerAction{
    type: TforcastReducerActions
    payload:{
        tasksLeftNum:number,
        curSessionLen:number,
        overallTaskRate:number
    }
}

function forcastReducer(state:string, action:IforcastReducerAction){

    switch (action.type){
        case forcastReducerActions.updateCompletionForcastEval:
            let forcast = 
            Math.round(((action.payload.tasksLeftNum!/
            action.payload.overallTaskRate!)*(action.payload.curSessionLen!/60)))
            
            if(action.payload.tasksLeftNum! > 0 && forcast===0){
                forcast = 1
            }
            
            if (forcast===Infinity || Number.isNaN(forcast)){
                return '.1..'
            }else{
                return forcast.toString()
            }
        default:
            throw Error('unfamiliar foracst action')
    }
    

}

export function useCompletionForcast(){
    
    const lastSessionCompletedTasksCounter = useRef<number>(0)
    const overallTaskRate = useRef<number>(0)
    const sessionNum = useRef<number>(0)
    const [forcast, forcastDispatch] = useReducer(forcastReducer, '...')
    
    function setLastSessionTaskCount(completedNum:number){
        lastSessionCompletedTasksCounter.current = completedNum
    }
    function calculateCurSessionRate(completedNum:number){
        const completedTasks = completedNum - lastSessionCompletedTasksCounter.current
        const cur_sum = overallTaskRate.current * sessionNum.current
        const new_sum = cur_sum + completedTasks

        overallTaskRate.current = new_sum/(sessionNum.current+1)
        sessionNum.current += 1
        console.log(`overallTaskRate.current: ${overallTaskRate.current}, sessionNum.current:${sessionNum.current} `)
    }

    return {setLastSessionTaskCount, calculateCurSessionRate,forcast,forcastDispatch, overallTaskRate }

}