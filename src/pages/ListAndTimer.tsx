import {PomodoroTimerHook} from '../appHooks/pomodoroTimerHook'
import {TodoPomodoroHeader} from '../components/header'
import { PomodoroTimer } from '../components/PomodoroTimer';
import {TodoPomodoList} from '../components/TodoPomodoroList'
import {TodosListHook} from '../appHooks/todoListHook'

export function ListAndTimer(){

    const {timer, breakLen, sessionLen, timerMode, startTimer, timerStatus, changeTime, pauseTimer, resumeTimer, changeTimerModes} = PomodoroTimerHook();
    const {todoList, changeStatusTodo} = TodosListHook()
//container-sm row text-center fw-light 
    return (
        <div className="ListAndTimer">
            <TodoPomodoroHeader/>
            <PomodoroTimer timer={timer}
             timerMode={timerMode}
             startTimer={startTimer}
             timerStatus={timerStatus}
             changeTime={changeTime}
             pauseTimer={pauseTimer}
             resumeTimer={resumeTimer}
             changeTimerModes={changeTimerModes}/>
             <TodoPomodoList todoList={todoList} changeStatusTodo={changeStatusTodo}/>

        </div>
    )
}
