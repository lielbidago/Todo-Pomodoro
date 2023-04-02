import {itodoLi} from '../appHooks/todoListHook'
import { useRef, useState } from 'react'
import { Overlay, Tooltip } from 'react-bootstrap'

interface TodoLIProps{
    changeStatusTodo(TaskId:number),
    todo: {id: number, completed: boolean, task:string},
    editTask(TaskId:number, newTask:string):void,
    deleteTodo(taskID:number):void,
    onDragStart,
    onDragEnter
    onDragEnd,
    toggleHelpTips: boolean
}

export function TodoLI(props: TodoLIProps){
    const {changeStatusTodo, editTask, deleteTodo, onDragEnter, onDragStart, onDragEnd, toggleHelpTips} = props
    const {id, completed, task} = props.todo

    const [showInput, setShowInput] = useState(false)
    
    const inputRef = useRef(null);
    const checkRef = useRef(null)
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
                <input className="toggle" type="checkbox" ref={checkRef} checked={completed} onChange = {()=>changeStatusTodo(id)}></input>
                <Overlay target={checkRef.current} show={toggleHelpTips} placement='right'>
                {(props) => (
                    <Tooltip {...props}>
                        check task off the list
                    </Tooltip>
                )} 
                </Overlay>
                <label onDoubleClick={()=>{setShowInput(true)}}>{task}</label> 
                <button className="buttonTodo" onClick={()=>deleteTodo(id)}>🗑</button>
                <button className="buttonTodo" onClick={()=>{setShowInput(true)}} >✎</button>
            </div>
            : <input type='text' defaultValue={task} ref={inputRef} autoFocus onKeyUp={onTaskEnter}></input>}
        </li>
    )
}