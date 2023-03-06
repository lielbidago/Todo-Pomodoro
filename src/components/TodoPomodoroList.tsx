import { useRef } from "react"
import { itodoLi } from "../appHooks/todoListHook"
import { TodoLI } from "./TodoLI"

interface TodoPomodoListProps{
    todoList: itodoLi[]
    changeStatusTodo,
    addTodo(td:string):void
}

export function TodoPomodoList(props: TodoPomodoListProps){
    
    const {todoList, changeStatusTodo, addTodo} = props
    const inputRef = useRef(null);

    function onTaskEnter(event: React.KeyboardEvent<HTMLDivElement>){
        if(event.key === 'Enter'){
            addTodo(inputRef.current.value);
            inputRef.current.value = "";
        }
    }

    function onEnterTask(event: React.MouseEvent<HTMLElement>){
        addTodo(inputRef.current.value);
        inputRef.current.value = "";
    }
// col
    return (
        <div className="TodoPomodoroList">
            <h4 className="todos-title" >My Todos</h4>
            <div className="EnterTodo">
                <input ref={inputRef} autoFocus placeholder={'enter a task here!'} onKeyUp={onTaskEnter}/>
                <button type="button" className="btn btn-outline-dark" onClick={onEnterTask}>add task</button>
            </div>
            <ul className="my-todos">
                {todoList.map((td:itodoLi)=> (<TodoLI todo={td} key={td.id} changeStatusTodo={changeStatusTodo}/>))}
            </ul>
        </div>
    )
}