import React, { useRef, useState } from 'react'
import { Overlay, Tooltip } from 'react-bootstrap';
import '../scss/TodoLI.scss';
import '../scss/checkbox.scss';
import { TimedTodoModal } from './TimedTodoModal';
import { itodoLi, ItodosReducerAction, todosActions } from '../hooks/usedTodoListHook';

// export interface TodoLIProps{
//     changeStatusTodo(TaskId:number):void,
//     todo: itodoLi,
//     editTask(TaskId:number, newTask:string):void,
//     deleteTodo(taskID:number):void,
//     onDragStart(e:React.DragEvent<HTMLLIElement>):void,
//     onDragEnter(e:React.DragEvent<HTMLLIElement>):void,
//     onDragEnd(e:React.DragEvent<HTMLLIElement>):void,
//     toggleHelpTips: boolean,
//     addTimeToTodo(taskID:number, timeto:string):void,
//     setTimedTodo(timeToSet:string, taskID:number):void,
//     cancelTimedTodo(taskID:number):void,
//     toggleShowTodoModal():void
// }

export interface TodoLIProps{
    todo: itodoLi,
    dispatch(action:ItodosReducerAction):void,
    toggleHelpTips: boolean,
    onDragStart(e:React.DragEvent<HTMLLIElement>):void,
    onDragEnter(e:React.DragEvent<HTMLLIElement>):void,
    onDragEnd(e:React.DragEvent<HTMLLIElement>):void,

}

export function TodoLI(props:TodoLIProps){
    
    const {todo, dispatch, toggleHelpTips, onDragStart,onDragEnter, onDragEnd} = props
    
    const {id, completed, task, timed} = todo

    const [showInput, setShowInput] = useState(false)

    const [showTodoModal, setShowTodoModal] = useState(false);
    const toggleShowTodoModal = () => {setShowTodoModal(!showTodoModal)}

    const inputRef = useRef<HTMLInputElement>(null);
    const checkRef = useRef<HTMLInputElement>(null)

    function onTaskEnter(event: React.KeyboardEvent<HTMLDivElement>){
        
        if(inputRef.current && event.key === 'Enter'){
            if(inputRef.current.value !=='' && inputRef.current.value!==' '){
                dispatch({
                    type:todosActions.editTask, 
                    payload:{taskId: id, newTask:inputRef.current.value}
                });
            }

            setShowInput(false);

        }
    }

    function handleShowTodoModal(){
        toggleShowTodoModal()
    }

    function handleDeleteTodo(){
        dispatch({
            type:todosActions.deleteTodo,
            payload:{taskId:todo.id}
        })
    }

    function handleChangeStatusTodo(){
        dispatch({
            type:todosActions.changeStatusTodo,
            payload:{taskId:todo.id}
        })
    }



//returnhere
    return (
        <li className="Todo-li" draggable onDragStart={(e)=>onDragStart(e)} onDragEnter={(e)=> onDragEnter(e)}
         onDragEnd={(e)=> onDragEnd(e)} onDragOver={(e)=> e.preventDefault()} id={'li-'+ id.toString()}>

            <TimedTodoModal toggleShowTodoModal={toggleShowTodoModal}
            dispatch={dispatch}
            showTodoModal={showTodoModal} todo={todo} />

            {!showInput? 
            <div className="todo">
                <div className='checkbox-wrapper-11'>
                    <input className="toggle" type="checkbox" ref={checkRef} checked={completed} onChange = {()=>handleChangeStatusTodo()}></input>
                    
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
                    
                    <button className="buttonTodo" onClick={()=>handleDeleteTodo()}>🗑</button>
                    <button className="buttonTodo" onClick={handleShowTodoModal} >✎</button>
                
                </div>
                

            </div>
            : 
            <input type='text' defaultValue={task} ref={inputRef} autoFocus onKeyUp={onTaskEnter}></input>}
        </li>
    )
}