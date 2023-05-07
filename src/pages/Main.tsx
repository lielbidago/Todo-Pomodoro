import {usePomodoroTimerHook} from '../hooks/usepPomodoroTimerHook'
import {TodoPomodoroHeader} from '../components/header'
import { PomodoroTimer } from '../components/PomodoroTimer';
import {TodoPomodoList} from '../components/TodoPomodoroList'
// import {useTodosListHook} from '../hooks/usedTodoListHook'
import { Settings } from '../components/Settings';
import { ProgressBarP } from '../components/prograssBar';
import { CompletionForcast } from '../components/CompletionForcast';
import { useContext, useRef, useState, useCallback, useEffect } from 'react';
import { ThemeContext } from '../context/themeContext';
import {todosActions, useTodoListState} from '../hooks/usedTodoListHook'
import { useSettings } from '../hooks/useSettings';


export function Main(){

    const {timer, timerMode, startTimer, timerStatus, changeTime,
        pauseTimer, resumeTimer, changeTimerModes,
        setSessionAndBreakLen,sessionsLoop,
        setSessionLoopMode, sessionLen, breakLen, setTimerTime,
         updateSessionAndBreakLen, timerBell, toggleSoundOn, soundOn } 
         = usePomodoroTimerHook();

    const {showSettings, toggleShowSettings} = useSettings();

    const { todosCompState, dispatch} = useTodoListState()

    const {themeColors } = useContext(ThemeContext)

    const [completedTasksCounter, setCompletedTasksCounter] = useState(0)

    const overallTaskRate = useRef<number>(0)
    const sessionNum = useRef<number>(0)
    sessionNum.current = 0;

    const [toggleHelpTips, setToggleHelpTips] = useState(false)

    const [timerFullScreen, setTimerFullScreen] = useState(false)
    
    const updateTodosState = useCallback(()=>{
        dispatch({type:todosActions.updateTodosState, payload:{}})},[])

    function toggleTimerFullScreen(){
        setTimerFullScreen(!timerFullScreen)
    }
    function setLastSessionTaskCount(){
        setCompletedTasksCounter(todosCompState.completedNum)
    }

    function calculateCurSessionRate(){
        //completedTasksCount
        const completedTasks = todosCompState.allNum - completedTasksCounter
        const cur_sum = overallTaskRate.current * sessionNum.current
        const new_sum = cur_sum + completedTasks

        overallTaskRate.current = new_sum/(sessionNum.current+1)
        sessionNum.current += + 1

    }

    function CompletionForcastEval(){
        // let forcast = Math.round(((todoList.length - completedTasksCount)/overallTaskRate.current)*(sessionLen/60))
        
        // if(todoList.length - completedTasksCount > 0 && forcast===0){
        //     forcast = 1
        // }

        let forcast = Math.round(((todosCompState.allNum - todosCompState.completedNum)/overallTaskRate.current)*(sessionLen/60))
        
        if(todosCompState.allNum - todosCompState.completedNum > 0 && forcast===0){
            forcast = 1
        }
        
        if (forcast===Infinity || Number.isNaN(forcast)){
            return '...'
        }else{
            return forcast
        }

    }

    function progressValue(){
        return Math.round((todosCompState.completedNum/todosCompState.allNum)*100)
    }

    useEffect(()=>{
        updateTodosState()
    },[updateTodosState])


    if(timerFullScreen){
        return (
            <div className="ListAndTimer timer-center" >
                <TodoPomodoroHeader handleShowSettings={toggleShowSettings} themeColors={themeColors} toggleHelpTips={toggleHelpTips} setToggleHelpTips={setToggleHelpTips}/>

                <PomodoroTimer timer={timer}
                timerMode={timerMode}
                startTimer={startTimer}
                timerStatus={timerStatus}
                changeTime={changeTime}
                pauseTimer={pauseTimer}
                resumeTimer={resumeTimer}
                changeTimerModes={changeTimerModes}
                handleShowSettings={toggleShowSettings}
                sessionsLoop={sessionsLoop}
                sessionLen={sessionLen} breakLen={breakLen}
                setTimerTime={setTimerTime}
                updateSessionAndBreakLen={updateSessionAndBreakLen}
                timerBell={timerBell}
                soundOn={soundOn}
                toggleSoundOn = {toggleSoundOn}
                setLastSessionTaskCount={setLastSessionTaskCount}
                calculateCurSessionRate={calculateCurSessionRate}
                toggleHelpTips={toggleHelpTips}
                toggleTimerFullScreen = {toggleTimerFullScreen}
                themeColors = {themeColors}

                />

            <Settings 
             setSessionLoopMode={setSessionLoopMode} showSettings={showSettings}
             handleCloseSettings={toggleShowSettings} 
             setSessionAndBreakLen={setSessionAndBreakLen}/>

            </div>
            
        )
    }
    return (
        <div className="ListAndTimer" >

            <TodoPomodoroHeader handleShowSettings={toggleShowSettings} 
            themeColors= {themeColors} toggleHelpTips={toggleHelpTips} setToggleHelpTips={setToggleHelpTips}/>

            <PomodoroTimer timer={timer}
             timerMode={timerMode}
             startTimer={startTimer}
             timerStatus={timerStatus}
             changeTime={changeTime}
             pauseTimer={pauseTimer}
             resumeTimer={resumeTimer}
             changeTimerModes={changeTimerModes}
             handleShowSettings={toggleShowSettings}
               sessionsLoop={sessionsLoop}
                sessionLen={sessionLen} breakLen={breakLen}
                setTimerTime={setTimerTime}
                updateSessionAndBreakLen={updateSessionAndBreakLen}
                timerBell={timerBell}
                soundOn={soundOn}
                toggleSoundOn = {toggleSoundOn}
                setLastSessionTaskCount={setLastSessionTaskCount}
                calculateCurSessionRate={calculateCurSessionRate}
                themeColors= {themeColors}
                toggleHelpTips={toggleHelpTips}
                toggleTimerFullScreen = {toggleTimerFullScreen}

             />

            
            <div className="updates">
                <ProgressBarP progressValue={progressValue()} themeColors={themeColors} 
                toggleHelpTips={toggleHelpTips}/>

                <CompletionForcast CompletionForcastEval={CompletionForcastEval} 
                themeColors={themeColors} toggleHelpTips={toggleHelpTips}/>
            </div>

            <TodoPomodoList todosCompState={todosCompState} toggleHelpTips={toggleHelpTips} 
            dispatch={dispatch}
            />


            <Settings 
             setSessionLoopMode={setSessionLoopMode} showSettings={showSettings}
             handleCloseSettings={toggleShowSettings} 
             setSessionAndBreakLen={setSessionAndBreakLen} />
             
            
        </div>
    )
}

