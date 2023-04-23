import React, { useRef, useState } from 'react'
import { Overlay, Tooltip } from 'react-bootstrap'
import '../scss/TodoLI.scss';
import '../scss/checkbox.scss';
import { TimedTodoModal } from './TimedTodoModal';

// export interface TodoLIProps{
//     changeStatusTodo(TaskId:number),
//     todo: {id: number, completed: boolean, task:string},
//     editTask(TaskId:number, newTask:string):void,
//     deleteTodo(taskID:number):void,
//     onDragStart(e):void,
//     onDragEnter(e),
//     onDragEnd(e),
//     toggleHelpTips: boolean,
//     toggleShowTodoModal():void
// }

export function TodoLI({props}){
    const {changeStatusTodo, editTask, deleteTodo,setTimedTodo, cancelTimedTodo, onDragEnter, onDragStart, onDragEnd, toggleHelpTips, todo} = props
    const {id, completed, task, timed} = todo

    const [showInput, setShowInput] = useState(false)

    const [showTodoModal, setShowTodoModal] = useState(false);
    const toggleShowTodoModal = () => {setShowTodoModal(!showTodoModal)}

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

    function handleShowTodoModal(){
        toggleShowTodoModal()
    }


    return (
        <li className="Todo-li" draggable onDragStart={onDragStart} onDragEnter={onDragEnter}
         onDragEnd={onDragEnd} onDragOver={(e)=> e.preventDefault()} id={'li-'+ id.toString()}>

            <TimedTodoModal props={{toggleShowTodoModal, editTask, setTimedTodo, cancelTimedTodo, showTodoModal, todo}}/>

            {!showInput? 
            <div className="todo">
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

                </div>
                <div className="buttons">
                    
                    <button className="buttonTodo" onClick={()=>deleteTodo(id)}>🗑</button>
                    <button className="buttonTodo" onClick={handleShowTodoModal} >✎</button>
                
                </div>
                

            </div>
            : 
            <input type='text' defaultValue={task} ref={inputRef} autoFocus onKeyUp={onTaskEnter}></input>}
        </li>
    )
}