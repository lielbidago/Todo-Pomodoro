import {itodoLi} from '../appHooks/todoListHook'
import { useRef, useState } from 'react'

interface TodoLIProps{
    changeStatusTodo(TaskId:number),
    todo: {id: number, completed: boolean, title:string},
    editTask(TaskId:number, newTask:string):void,
    deleteTodo(taskID:number):void
}

export function TodoLI(props: TodoLIProps){
    const {changeStatusTodo, editTask, deleteTodo} = props
    const {id, completed, title} = props.todo

    const [showInput, setShowInput] = useState(false)
    
    const inputRef = useRef(null);

    function onTaskEnter(event: React.KeyboardEvent<HTMLDivElement>){
        
        if(event.key === 'Enter'){
            if(inputRef.current.value!==''){
                editTask(id, inputRef.current.value);
            }
            setShowInput(false);

        }
    }

    return (
        <li className="Todo-li" id={'li-'+ id.toString()}>
            {!showInput? 
            <div className='checkbox-wrapper-11'>
                <input className="toggle" type="checkbox" checked={completed} onChange = {()=>changeStatusTodo(id)}></input>
                <label onDoubleClick={()=>{setShowInput(true)}}>{title}</label> 
                <button className="deleteTodo" onClick={()=>deleteTodo(id)}>&times;</button>
            </div>
            : <input type='text' placeholder={title} ref={inputRef} autoFocus onKeyUp={onTaskEnter}></input>}
        </li>
    )
}