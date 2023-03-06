import {PomodoroTimerHook} from '../appHooks/pomodoroTimerHook'
import {TodoPomodoroHeader} from '../components/header'
import { PomodoroTimer } from '../components/PomodoroTimer';
import {TodoPomodoList} from '../components/TodoPomodoroList'
import {TodosListHook} from '../appHooks/todoListHook'
import { useRef } from 'react';
import { EditTimer } from '../components/EditTimer';



export function ListAndTimer(){

    const {timer, timerMode, startTimer, timerStatus, changeTime,
        pauseTimer, resumeTimer, changeTimerModes,
        handleCloseEditTimer, showEditTimer, handleShowEditTimer } = PomodoroTimerHook();
    const {todoList, editListStatus, changeStatusTodo, changeStatusTodosEdit, addTodo} = TodosListHook()

    const inputRef = useRef(null);

    return (
        <div className="ListAndTimer">

            <TodoPomodoroHeader changeStatusTodosEdit={changeStatusTodosEdit}/>

            <PomodoroTimer timer={timer}
             timerMode={timerMode}
             startTimer={startTimer}
             timerStatus={timerStatus}
             changeTime={changeTime}
             pauseTimer={pauseTimer}
             resumeTimer={resumeTimer}
             changeTimerModes={changeTimerModes}
             handleShowEditTimer={handleShowEditTimer}/>

             <TodoPomodoList todoList={todoList} 
             changeStatusTodo={changeStatusTodo} addTodo={addTodo}/>
            <EditTimer showEditTimer={showEditTimer} handleCloseEditTimer={handleCloseEditTimer}/>
             

        </div>
    )
}

//<TodosEditModal todoList={todoList}/>
//<div><button style={{textAlign:'center'}}onClick={()=>changeStatusTodosEdit(false)}>test!!!!</button></div>