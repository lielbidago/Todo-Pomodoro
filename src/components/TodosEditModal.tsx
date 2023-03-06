import {  useRef } from "react";
import { itodoLi, TodosListHook } from "../appHooks/todoListHook";
import { TodoLI } from "./TodoLI";

interface TodosEditModalProps{
    todoList: itodoLi[]
}

export function TodosEditModal(props:TodosEditModalProps){
    
    const inputRef = useRef(null);
    const {todoList, changeStatusTodo, addTodo, changeStatusTodosEdit} = TodosListHook()
    
    function onTaskEnter(event: React.KeyboardEvent<HTMLDivElement>){
        if(event.key === 'Enter'){
            addTodo(inputRef.current.value);
            inputRef.current.value = "";
        }
    }

    const onClose = (event: React.MouseEvent<HTMLElement>) => {
        console.log('entered onClose')
        changeStatusTodosEdit(false)
    }
    
    return (
        <div className="editMode">
            <div className="editModeHeader">  
            <h4 className="todos-title" >My Todos</h4> 
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}/>
            </div>
            <input ref={inputRef} autoFocus placeholder={'enter a task here!'} onKeyUp={onTaskEnter}/>
            <ul className="my-todos">
            {todoList.map((td)=> (<TodoLI todo={td} key={td.id} changeStatusTodo={changeStatusTodo}/>))}
            </ul>
        </div>

        // <div><button style={{textAlign:'center'}}onClick={()=>changeStatusTodosEdit(false)}>test!!!!</button></div>
    )
}


export function Testcomp(){
    const { changeStatusTodosEdit} = TodosListHook();
    return (<div><button onClick={()=>changeStatusTodosEdit(false)}>test!!!!</button></div>
    )
}



export function TodosEditModal2(props:TodosEditModalProps){
    
    const inputRef = useRef(null);
    const {todoList, changeStatusTodo, addTodo, changeStatusTodosEdit} = TodosListHook()
    
    function onTaskEnter(event: React.KeyboardEvent<HTMLDivElement>){
        if(event.key === 'Enter'){
            addTodo(inputRef.current.value);
            inputRef.current.value = "";
        }
    }

    const onClose = (event: React.MouseEvent<HTMLElement>) => {
        console.log('entered onClose')
        changeStatusTodosEdit(false)
    }
    
    return (
        <div className="editMode">
            <div className="editModeHeader">  
            <h4 className="todos-title" >My Todos</h4> 
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}/>
            </div>
            <input ref={inputRef} autoFocus placeholder={'enter a task here!'} onKeyUp={onTaskEnter}/>
            <ul className="my-todos">
            {todoList.map((td:itodoLi)=> (<TodoLI todo={td} key={td.id} changeStatusTodo={changeStatusTodo}/>))}
            </ul>
        </div>

        // <div><button style={{textAlign:'center'}}onClick={()=>changeStatusTodosEdit(false)}>test!!!!</button></div>
    )
}