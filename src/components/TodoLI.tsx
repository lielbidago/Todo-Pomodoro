import {itodoLi} from '../appHooks/todoListHook'
import { useRef, useState } from 'react'

interface TodoLIProps{
    changeStatusTodo(TaskId:number),
    todo: {id: number, completed: boolean, task:string},
    editTask(TaskId:number, newTask:string):void,
    deleteTodo(taskID:number):void,
    onDragStart,
    onDragEnter
    onDragEnd
}

export function TodoLI(props: TodoLIProps){
    const {changeStatusTodo, editTask, deleteTodo, onDragEnter, onDragStart, onDragEnd} = props
    const {id, completed, task} = props.todo

    const [showInput, setShowInput] = useState(false)
    
    const inputRef = useRef(null);

    function onTaskEnter(event: React.KeyboardEvent<HTMLDivElement>){
        
        if(event.key === 'Enter'){
            if(inputRef.current.value !=='' && inputRef.current.value!==' '){
                editTask(id, inputRef.current.value);
            }

            setShowInput(false);

        }
    }

    return (
        <li className="Todo-li" draggable onDragStart={onDragStart} onDragEnter={onDragEnter}
         onDragEnd={onDragEnd} onDragOver={(e)=> e.preventDefault()} id={'li-'+ id.toString()}>
            {!showInput? 
            <div className='checkbox-wrapper-11'>
                <input className="toggle" type="checkbox" checked={completed} onChange = {()=>changeStatusTodo(id)}></input>
                <label onDoubleClick={()=>{setShowInput(true)}}>{task}</label> 
                <button className="buttonTodo" onClick={()=>deleteTodo(id)}>🗑</button>
                <button className="buttonTodo" onClick={()=>{setShowInput(true)}} >✎</button>
            </div>
            : <input type='text' defaultValue={task} ref={inputRef} autoFocus onKeyUp={onTaskEnter}></input>}
        </li>
    )
}