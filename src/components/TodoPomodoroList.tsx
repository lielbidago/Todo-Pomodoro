import { useEffect, useRef } from "react"
import { itodoLi } from "../appHooks/todoListHook"
import { TodoLI } from "./TodoLI"

interface TodoPomodoListProps{
    todoList: itodoLi[]
    changeStatusTodo(taskID:number):void,
    addTodo(td:string):void,
    editTask(TaskId:number, newTask:string):void,
    deleteTodo(taskID:number):void
    updateTodosList():void,
    completedTasksCount: number,
    updateCompletedTasks():void
}

export function TodoPomodoList(props: TodoPomodoListProps){
    
    const {todoList, changeStatusTodo, addTodo, editTask, deleteTodo, updateTodosList, completedTasksCount, updateCompletedTasks} = props
    const inputRef = useRef(null);

    function onTaskEnter(event: React.KeyboardEvent<HTMLDivElement>){
        if(event.key === 'Enter'){
            if(inputRef.current.value!=='' && inputRef.current.value!==' '){
                addTodo(inputRef.current.value);
                inputRef.current.value = "";
            }

        }
    }

    function onEnterTask(event: React.MouseEvent<HTMLElement>){
        if(inputRef.current.value!=='' && inputRef.current.value!==' '){
            addTodo(inputRef.current.value);
            inputRef.current.value = "";
        }
    }

    useEffect(()=>{
        updateTodosList()
    }, [])

    useEffect(()=>{
        updateCompletedTasks()
    }, [todoList])



    const dotsColor1 = localStorage.getItem('theme1');

    // const dotsColor2 = localStorage.getItem('theme2');
    // const gradient = {borderImage: `linear-gradient(90deg, ${dotsColor1}, ${dotsColor2}) 1`}

    return (
        <div className="TodoPomodoroList">
            <div className="todos-title" style={{borderTopColor: `${dotsColor1}`}}><h4 >My Todos</h4></div>
            <div className="EnterTodo">
                <input ref={inputRef} autoFocus placeholder={'enter a task here!'} onKeyUp={onTaskEnter}/>
                <button type="button" className="btn btn-outline-dark" onClick={onEnterTask}>add task</button>
            </div>
            <ul className="my-todos">
                {todoList.map((td:itodoLi)=> (<TodoLI todo={td} key={td.id} changeStatusTodo={changeStatusTodo} editTask={editTask} deleteTodo={deleteTodo}/>))}
            </ul>
            <div className="todos-footer">
                <div className="completed"><p>completed: {completedTasksCount}</p></div>
                <div className="all">all:{todoList.length}</div>
                <div className="export-to-excel">
                    <button type="button" className="btn btn-outline-dark">export to excel</button>
                </div>
                
            </div>
        </div>
    )
}