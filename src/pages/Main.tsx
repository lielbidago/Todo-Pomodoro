import {PomodoroTimerHook} from '../hooks/pomodoroTimerHook'
import {TodoPomodoroHeader} from '../components/header'
import { PomodoroTimer } from '../components/PomodoroTimer';
import {TodoPomodoList} from '../components/TodoPomodoroList'
import {useTodosListHook} from '../hooks/todoListHook'
import { Settings } from '../components/Settings';
import { ProgressBarP } from '../components/prograssBar';
import { CompletionForcast } from '../components/CompletionForcast';
import { useContext, useState } from 'react';
import { ThemeContext } from '../context/themeContext';



export function Main(){

    const {timer, timerMode, startTimer, timerStatus, changeTime,
        pauseTimer, resumeTimer, changeTimerModes,
        handleCloseSettings, showSettings, handleShowSettings,
        setSessionAndBreakLen,sessionsLoop,
        setSessionLoopMode, sessionLen, breakLen, setTimerTime,
         updateSessionAndBreakLen, timerBell, toggleSoundOn, soundOn } 
         = PomodoroTimerHook();
        //use

    const {todoList, changeStatusTodo,
         addTodo, editTask, 
        progressValue, deleteTodo,todosTitle,
        changeTodosTitle, updateTodosList
        , completedTasksCount, updateCompletedTasks, updateTodosTitle,
         handleItemOrderChange, timeTodo, cancelTimedTodo, addTimeToTodo}
        = useTodosListHook();

    const {buttonColor, customeTheme1, customeTheme2} = useContext(ThemeContext)

    const [completedTasksCounter, setCompletedTasksCounter] = useState(0)
    const [overallTaskRate, setOverallTaskRate] = useState(0)
    const [sessionNum, setSessionNum] = useState(0)
// useRef 
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
        const cur_sum = overallTaskRate * sessionNum
        const new_sum = cur_sum + completedTasks

        setOverallTaskRate(new_sum/(sessionNum+1))
        setSessionNum(sessionNum + 1)

    }


    function CompletionForcastEval(){
        let forcast = Math.round(((todoList.length - completedTasksCount)/overallTaskRate)*(sessionLen/60))
        
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
                <TodoPomodoroHeader handleShowSettings={handleShowSettings} buttonColor={buttonColor} toggleHelpTips={toggleHelpTips} setToggleHelpTips={setToggleHelpTips}/>

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
                buttonColor={buttonColor}
                toggleHelpTips={toggleHelpTips}
                toggleTimerFullScreen = {toggleTimerFullScreen}

                />

            <Settings 
             setSessionLoopMode={setSessionLoopMode} showSettings={showSettings}
             handleCloseSettings={handleCloseSettings} 
             setSessionAndBreakLen={setSessionAndBreakLen}
             customeTheme1={customeTheme1}
             customeTheme2={customeTheme2} />

            </div>
            
        )
    }
    return (
        <div className="ListAndTimer" >

            <TodoPomodoroHeader handleShowSettings={handleShowSettings} buttonColor={buttonColor} toggleHelpTips={toggleHelpTips} setToggleHelpTips={setToggleHelpTips}/>

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
                buttonColor={buttonColor}
                toggleHelpTips={toggleHelpTips}
                toggleTimerFullScreen = {toggleTimerFullScreen}

             />

            
            <div className="updates">
                <ProgressBarP progressValue={progressValue()} buttonColor={buttonColor} toggleHelpTips={toggleHelpTips}/>
                <CompletionForcast CompletionForcastEval={CompletionForcastEval} buttonColor={buttonColor} toggleHelpTips={toggleHelpTips}/>
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
             setSessionAndBreakLen={setSessionAndBreakLen}
             customeTheme1={customeTheme1}
             customeTheme2={customeTheme2} />
             
            
        </div>
    )
}
