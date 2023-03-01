import {PomodoroTimerHook} from '../appHooks/pomodoroTimerHook'
import {TodoPomodoroHeader} from '../components/header'
import { PomodoroTimer } from '../components/PomodoroTimer';
import {TodoPomodoList} from '../components/TodoPomodoroList'
import {TodosListHook} from '../appHooks/todoListHook'

export function ListAndTimer(){

    const {timer, breakLen, sessionLen, timerMode, startTimer, timerStatus, changeTime, pauseTimer, resumeTimer} = PomodoroTimerHook();
    const {todoList, changeStatusTodo} = TodosListHook()

    return (
        <div className="ListAndTimer container-sm row text-center fw-light ">
            <TodoPomodoroHeader/>
            <PomodoroTimer timer={timer}
             timerMode={timerMode}
             startTimer={startTimer}
             timerStatus={timerStatus}
             changeTime={changeTime}
             pauseTimer={pauseTimer}
             resumeTimer={resumeTimer}/>
             <TodoPomodoList todoList={todoList} changeStatusTodo={changeStatusTodo}/>

        </div>
    )
}
