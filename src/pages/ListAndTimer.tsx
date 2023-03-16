import {PomodoroTimerHook} from '../appHooks/pomodoroTimerHook'
import {TodoPomodoroHeader} from '../components/header'
import { PomodoroTimer } from '../components/PomodoroTimer';
import {TodoPomodoList} from '../components/TodoPomodoroList'
import {TodosListHook} from '../appHooks/todoListHook'
import { Settings } from '../components/Settings';
import { ProgressBarP } from '../components/prograssBar';
import { CompletionForcast } from '../components/CompletionForcast';
import { useState } from 'react';




export function ListAndTimer(){

    const {timer, timerMode, startTimer, timerStatus, changeTime,
        pauseTimer, resumeTimer, changeTimerModes,
        handleCloseSettings, showSettings, handleShowSettings,
        setSessionAndBreakLen,sessionsLoop,
        setSessionLoopMode, sessionLen, breakLen } = PomodoroTimerHook();

    const {todoList, changeStatusTodo,
        changeStatusTodosEdit, addTodo, editTask, 
        progressValue, deleteTodo}
        = TodosListHook()
    
    const [lastSessionsRate, setLastSessionsRate] = useState([])

    function getSessionStats(){
        
    }
    
    

    return (
        <div className="ListAndTimer" >

            <TodoPomodoroHeader changeStatusTodosEdit={changeStatusTodosEdit} handleShowSettings={handleShowSettings}/>

            <PomodoroTimer timer={timer}
             timerMode={timerMode}
             startTimer={startTimer}
             timerStatus={timerStatus}
             changeTime={changeTime}
             pauseTimer={pauseTimer}
             resumeTimer={resumeTimer}
             changeTimerModes={changeTimerModes}
             handleShowSettings={handleShowSettings} progressValue={progressValue} sessionsLoop={sessionsLoop} sessionLen={sessionLen} breakLen={breakLen}
             />

            

            {/* {editListStatus?
                <TodosEditModal todoListAPI={{addTodo, changeStatusTodosEdit, todoList, changeStatusTodo, editTask}} />:
                <TodoPomodoList todoList={todoList} 
                changeStatusTodo={changeStatusTodo}
                 addTodo={addTodo}
                  editTask={editTask}
                  deleteTodo={deleteTodo}/>} */}
            
            <div className="updates">
                <ProgressBarP progressValue={progressValue()}/>
                <CompletionForcast/>
            </div>

            <TodoPomodoList todoList={todoList} 
                changeStatusTodo={changeStatusTodo}
                 addTodo={addTodo}
                  editTask={editTask}
                  deleteTodo={deleteTodo}/>
            


            <Settings setSessionLoopMode={setSessionLoopMode} showSettings={showSettings} handleCloseSettings={handleCloseSettings} setSessionAndBreakLen={setSessionAndBreakLen}/>
             
            
        </div>
    )
}

//<TodosEditModal todoList={todoList}/>
//<div><button style={{textAlign:'center'}}onClick={()=>changeStatusTodosEdit(false)}>test!!!!</button></div>