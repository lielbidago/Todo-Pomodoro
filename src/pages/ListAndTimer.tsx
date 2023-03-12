import {PomodoroTimerHook} from '../appHooks/pomodoroTimerHook'
import {TodoPomodoroHeader} from '../components/header'
import { PomodoroTimer } from '../components/PomodoroTimer';
import {TodoPomodoList} from '../components/TodoPomodoroList'
import {TodosListHook} from '../appHooks/todoListHook'
import { Settings } from '../components/Settings';
import { TodosEditModal } from '../components/TodosEditModal';
import {customeBackground} from '../helperFunctions/themes'
import { ProgressBarP } from '../components/prograssBar';



export function ListAndTimer(){

    const {timer, timerMode, startTimer, timerStatus, changeTime,
        pauseTimer, resumeTimer, changeTimerModes,
        handleCloseSettings, showSettings, handleShowSettings,
        setSessionAndBreakLen } = PomodoroTimerHook();

    const {todoList, editListStatus, changeStatusTodo,
        changeStatusTodosEdit, addTodo, editTask, progressValue}
        = TodosListHook()
    

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
             handleShowSettings={handleShowSettings} progressValue={progressValue}/>

            

            {editListStatus?
                <TodosEditModal todoListAPI={{addTodo, changeStatusTodosEdit, todoList, changeStatusTodo, editTask}} />:
                <TodoPomodoList todoList={todoList} 
                changeStatusTodo={changeStatusTodo} addTodo={addTodo} editTask={editTask}/>}
             
            <Settings showSettings={showSettings} handleCloseSettings={handleCloseSettings} setSessionAndBreakLen={setSessionAndBreakLen}/>
             

        </div>
    )
}

//<TodosEditModal todoList={todoList}/>
//<div><button style={{textAlign:'center'}}onClick={()=>changeStatusTodosEdit(false)}>test!!!!</button></div>