import React, { useRef, useState } from 'react'
import { Overlay, Tooltip } from 'react-bootstrap';
import '../scss/TodoLI.scss';
import '../scss/checkbox.scss';
import { TimedTodoModal } from './TimedTodoModal';
import { itodoLi } from '../hooks/usedTodoListHook';

export interface TodoLIProps{
    changeStatusTodo(TaskId:number):void,
    todo: itodoLi,
    editTask(TaskId:number, newTask:string):void,
    deleteTodo(taskID:number):void,
    onDragStart(e:React.DragEvent<HTMLLIElement>):void,
    onDragEnter(e:React.DragEvent<HTMLLIElement>):void,
    onDragEnd(e:React.DragEvent<HTMLLIElement>):void,
    toggleHelpTips: boolean,
    addTimeToTodo(taskID:number, timeto:string):void,
    setTimedTodo(timeToSet:string, taskID:number):void,
    cancelTimedTodo(taskID:number):void,
    toggleShowTodoModal():void
}

export function TodoLI(props:TodoLIProps){
    const {changeStatusTodo, editTask,addTimeToTodo, deleteTodo,setTimedTodo, cancelTimedTodo, onDragEnter, onDragStart, onDragEnd, toggleHelpTips, todo} = props
    const {id, completed, task, timed} = todo

    const [showInput, setShowInput] = useState(false)

    const [showTodoModal, setShowTodoModal] = useState(false);
    const toggleShowTodoModal = () => {setShowTodoModal(!showTodoModal)}

    const inputRef = useRef<HTMLInputElement>(null);
    const checkRef = useRef<HTMLInputElement>(null)

    function onTaskEnter(event: React.KeyboardEvent<HTMLDivElement>){
        
        if(inputRef.current && event.key === 'Enter'){
            if(inputRef.current.value !=='' && inputRef.current.value!==' '){
                editTask(id, inputRef.current.value);
            }

            setShowInput(false);

        }
    }

    function handleShowTodoModal(){
        toggleShowTodoModal()
    }

//returnhere
    return (
        <li className="Todo-li" draggable onDragStart={(e)=>onDragStart(e)} onDragEnter={(e)=> onDragEnter(e)}
         onDragEnd={(e)=> onDragEnd(e)} onDragOver={(e)=> e.preventDefault()} id={'li-'+ id.toString()}>

            <TimedTodoModal toggleShowTodoModal={toggleShowTodoModal}
            editTask={editTask} setTimedTodo={setTimedTodo}
             cancelTimedTodo={cancelTimedTodo} showTodoModal={showTodoModal} todo={todo} addTimeToTodo={addTimeToTodo}/>

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