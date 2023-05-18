import React, { useRef, useState } from 'react'
import { Overlay, Tooltip } from 'react-bootstrap';
import '../scss/TodoLI.scss';
import '../scss/checkbox.scss';
import { EditTodoModal } from './EditTodoModal';
import { todosReducerActions } from '../hooks/useTodoList';
import { itodoLi, ItodosReducerAction } from '../hooks/useTodoListTypes';



export interface TodoLIProps{
    todo: itodoLi,
    listDispatch(action:ItodosReducerAction):void,
    toggleHelpTips: boolean,
    onDragStart(e:React.DragEvent<HTMLLIElement>):void,
    onDragEnter(e:React.DragEvent<HTMLLIElement>):void,
    onDragEnd(e:React.DragEvent<HTMLLIElement>):void,

}

export function TodoLI(props:TodoLIProps){
    
    const {todo, listDispatch, toggleHelpTips, onDragStart,onDragEnter, onDragEnd} = props
    
    const {id, completed, task} = todo

    const [showInput, setShowInput] = useState(false)

    const [showTodoModal, setShowTodoModal] = useState(false);
    const toggleShowTodoModal = () => {setShowTodoModal(!showTodoModal)}

    const inputRef = useRef<HTMLInputElement>(null);
    const checkRef = useRef<HTMLInputElement>(null)

    function onTaskEnter(event: React.KeyboardEvent<HTMLDivElement>){
        
        if(inputRef.current && event.key === 'Enter'){
            if(inputRef.current.value !=='' && inputRef.current.value!==' '){
                listDispatch({
                    type:todosReducerActions.editTask, 
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
        listDispatch({
            type:todosReducerActions.deleteTodo,
            payload:{taskId:todo.id}
        })
    }

    function handleChangeStatusTodo(){
        listDispatch({
            type:todosReducerActions.changeStatusTodo,
            payload:{taskId:todo.id}
        })
    }


    return (
        <li className="Todo-li" draggable onDragStart={(e)=>onDragStart(e)} onDragEnter={(e)=> onDragEnter(e)}
         onDragEnd={(e)=> onDragEnd(e)} onDragOver={(e)=> e.preventDefault()} id={'li-'+ id.toString()}>

            <EditTodoModal toggleShowTodoModal={toggleShowTodoModal}
            listDispatch={listDispatch}
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