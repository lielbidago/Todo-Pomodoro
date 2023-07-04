import {useTimer} from '../hooks/useTimer'
import {TodoPomodoroHeader} from '../components/header'
import { PomodoroTimer } from '../components/PomodoroTimer';
import {TodoPomodoList} from '../components/TodoPomodoroList'
import { Settings } from '../components/Settings';
import { ProgressBarP } from '../components/prograssBar';
import { CompletionForcast } from '../components/CompletionForcast';
import { useContext, useState, useCallback, useEffect } from 'react';
import { ThemeContext } from '../context/themeContext';
import {todosReducerActions, useTodoListState} from '../hooks/useTodoList'
import { useSettings } from '../hooks/useSettings';
import { forcastReducerActions, useCompletionForcast } from '../hooks/useCompletionForcast';

export default function Main(){

    const {timerState, timerDispatch} = useTimer();
    const {showSettings, toggleShowSettings} = useSettings();
    const { todosCompState, listDispatch} = useTodoListState();
    const {setLastSessionTaskCount, calculateCurSessionRate,forcast,forcastDispatch, overallTaskRate } = useCompletionForcast();
    const {themeColors } = useContext(ThemeContext)

    const [toggleHelpTips, setToggleHelpTips] = useState(false)
    const [timerFullScreen, setTimerFullScreen] = useState(false)
    
    const updateTodosState = useCallback(()=>{
        listDispatch({type:todosReducerActions.updateTodosState, payload:{}})},[listDispatch])

    function toggleTimerFullScreen(){
        setTimerFullScreen(!timerFullScreen)
    }



    // function progressValue(){
    //     return Math.round((todosCompState.completedNum/todosCompState.allNum)*100)
    // }

    useEffect(()=>{
        updateTodosState()
    },[updateTodosState])

    function handleRateTasksUpdate(){
        setLastSessionTaskCount(todosCompState.completedNum)
    }

    function updateForcast(){
        calculateCurSessionRate(todosCompState.completedNum);
        forcastDispatch({type:forcastReducerActions.updateCompletionForcastEval, payload:{
            tasksLeftNum:todosCompState.allNum-todosCompState.completedNum, 
            overallTaskRate: overallTaskRate.current,
            curSessionLen:timerState.session
        }})
    }


    if(timerFullScreen){
        return (
            <div className="ListAndTimer timer-center" >
                <TodoPomodoroHeader handleShowSettings={toggleShowSettings} themeColors={themeColors} 
                toggleHelpTips={toggleHelpTips} setToggleHelpTips={setToggleHelpTips}/>

                <PomodoroTimer timerState={timerState} 
                timerDispatch = {timerDispatch}
                handleRateTasksUpdate={handleRateTasksUpdate}
                updateForcast={updateForcast}
                toggleHelpTips={toggleHelpTips}
                toggleTimerFullScreen = {toggleTimerFullScreen}
                themeColors = {themeColors}
                />

                <Settings
                showSettings={showSettings}
                handleCloseSettings={toggleShowSettings} 
                timerDispatch={timerDispatch}
                timerState={timerState}
                />

            </div>
            
        )
    }
    return (
        <div className="ListAndTimer" >

            <TodoPomodoroHeader handleShowSettings={toggleShowSettings} 
            themeColors= {themeColors} toggleHelpTips={toggleHelpTips} setToggleHelpTips={setToggleHelpTips}/>

            <PomodoroTimer timerState={timerState} 
                timerDispatch = {timerDispatch}
                handleRateTasksUpdate={handleRateTasksUpdate}
                updateForcast={updateForcast}
                toggleHelpTips={toggleHelpTips}
                toggleTimerFullScreen = {toggleTimerFullScreen}
                themeColors = {themeColors}
                />

            
            <div className="updates">
                <ProgressBarP todosCompState={todosCompState} themeColors={themeColors} 
                toggleHelpTips={toggleHelpTips}/>

                <CompletionForcast forcast={forcast} 
                buttonColor={themeColors.buttonColor} toggleHelpTips={toggleHelpTips}/>
            </div>

            <TodoPomodoList todosCompState={todosCompState} toggleHelpTips={toggleHelpTips} 
            listDispatch={listDispatch}
            />


            <Settings 
                showSettings={showSettings}
                handleCloseSettings={toggleShowSettings} 
                timerDispatch={timerDispatch}
                timerState={timerState}
            />
             
            
        </div>
    )
}


