import {usePomodoroTimerHook} from '../hooks/usepPomodoroTimerHook'
import {TodoPomodoroHeader} from '../components/header'
import { PomodoroTimer } from '../components/PomodoroTimer';
import {TodoPomodoList} from '../components/TodoPomodoroList'
import {useTodosListHook} from '../hooks/usedTodoListHook'
import { Settings } from '../components/Settings';
import { ProgressBarP } from '../components/prograssBar';
import { CompletionForcast } from '../components/CompletionForcast';
import { useContext, useRef, useState } from 'react';
import { ThemeContext } from '../context/themeContext';



export function Main(){

    const {timer, timerMode, startTimer, timerStatus, changeTime,
        pauseTimer, resumeTimer, changeTimerModes,
        handleCloseSettings, showSettings, handleShowSettings,
        setSessionAndBreakLen,sessionsLoop,
        setSessionLoopMode, sessionLen, breakLen, setTimerTime,
         updateSessionAndBreakLen, timerBell, toggleSoundOn, soundOn } 
         = usePomodoroTimerHook();

    const {todoList, changeStatusTodo,
         addTodo, editTask, 
        progressValue, deleteTodo,todosTitle,
        changeTodosTitle, updateTodosList
        , completedTasksCount, updateCompletedTasks, updateTodosTitle,
         handleItemOrderChange, timeTodo, cancelTimedTodo, addTimeToTodo}
        = useTodosListHook();

    const {themeColors, setCustomeThemes } = useContext(ThemeContext)

    const [completedTasksCounter, setCompletedTasksCounter] = useState(0)
    // const [overallTaskRate, setOverallTaskRate] = useState(0)
    // const [sessionNum, setSessionNum] = useState(0)
    const overallTaskRate = useRef(null)
    overallTaskRate.current = 0;
    const sessionNum = useRef(null)
    sessionNum.current = 0;

    const [toggleHelpTips, setToggleHelpTips] = useState(false)

    const [timerFullScreen, setTimerFullScreen] = useState(false)


    function toggleTimerFullScreen(){
        setTimerFullScreen(!timerFullScreen)
    }
    function setLastSessionTaskCount(){
        setCompletedTasksCounter(completedTasksCount)
    }

    function calculateCurSessionRate(){

        const completedTasks = completedTasksCount - completedTasksCounter
        const cur_sum = overallTaskRate.current * sessionNum.current
        const new_sum = cur_sum + completedTasks

        overallTaskRate.current = new_sum/(sessionNum.current+1)
        sessionNum.current += + 1

    }


    function CompletionForcastEval(){
        let forcast = Math.round(((todoList.length - completedTasksCount)/overallTaskRate.current)*(sessionLen/60))
        
        if(todoList.length - completedTasksCount > 0 && forcast===0){
            forcast = 1
        }
        
        if (forcast===Infinity || Number.isNaN(forcast)){
            return '...'
        }else{
            return forcast
        }

    }


    if(timerFullScreen){
        return (
            <div className="ListAndTimer timer-center" >
                <TodoPomodoroHeader handleShowSettings={handleShowSettings} themeColors={themeColors} toggleHelpTips={toggleHelpTips} setToggleHelpTips={setToggleHelpTips}/>

                <PomodoroTimer timer={timer}
                timerMode={timerMode}
                startTimer={startTimer}
                timerStatus={timerStatus}
                changeTime={changeTime}
                pauseTimer={pauseTimer}
                resumeTimer={resumeTimer}
                changeTimerModes={changeTimerModes}
                handleShowSettings={handleShowSettings}
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
             handleCloseSettings={handleCloseSettings} 
             setSessionAndBreakLen={setSessionAndBreakLen}/>

            </div>
            
        )
    }
    return (
        <div className="ListAndTimer" >

            <TodoPomodoroHeader handleShowSettings={handleShowSettings} 
            themeColors= {themeColors} toggleHelpTips={toggleHelpTips} setToggleHelpTips={setToggleHelpTips}/>

            <PomodoroTimer timer={timer}
             timerMode={timerMode}
             startTimer={startTimer}
             timerStatus={timerStatus}
             changeTime={changeTime}
             pauseTimer={pauseTimer}
             resumeTimer={resumeTimer}
             changeTimerModes={changeTimerModes}
             handleShowSettings={handleShowSettings}
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

            <TodoPomodoList todoList={todoList} 
                changeStatusTodo={changeStatusTodo}
                 addTodo={addTodo}
                  editTask={editTask}
                  deleteTodo={deleteTodo} updateTodosList={updateTodosList}
                   completedTasksCount={completedTasksCount}
                    updateCompletedTasks={updateCompletedTasks}
                    todosTitle={todosTitle} changeTodosTitle={changeTodosTitle}
                    updateTodosTitle={updateTodosTitle}
                    handleItemOrderChange = {handleItemOrderChange}
                    toggleHelpTips={toggleHelpTips}
                    timeTodo = {timeTodo}
                    cancelTimedTodo = {cancelTimedTodo}
                    addTimeToTodo={addTimeToTodo}
            />


            <Settings 
             setSessionLoopMode={setSessionLoopMode} showSettings={showSettings}
             handleCloseSettings={handleCloseSettings} 
             setSessionAndBreakLen={setSessionAndBreakLen} />
             
            
        </div>
    )
}
