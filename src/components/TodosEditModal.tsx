import {  useRef } from "react";
import { itodoLi, TodosListHook } from "../appHooks/todoListHook";
import { TodoLI } from "./TodoLI";

interface TodosEditModalProps{
    todoListAPI
    
}

export function TodosEditModal(props:TodosEditModalProps){
    
    const inputRef = useRef(null);
    const {todoListAPI} = props;
    
    function onTaskEnter(event: React.KeyboardEvent<HTMLDivElement>){
        if(event.key === 'Enter'){
            todoListAPI.addTodo(inputRef.current.value);
            inputRef.current.value = "";
        }
    }

    const onClose = (event: React.MouseEvent<HTMLElement>) => {
        // console.log('entered onClose')
        todoListAPI.changeStatusTodosEdit(false)
    }
    
//     return (
//         <div className="editMode">
//             <div className="editModeHeader">  
//             <h4 className="todos-title" >My Todos</h4> 
//             <button type="button" className="btn-close" aria-label="Close" onClick={onClose}/>
//             </div>
//             <input ref={inputRef} autoFocus placeholder={'enter a task here!'} onKeyUp={onTaskEnter}/>
//             <ul className="my-todos">
//             {todoListAPI.todoList.map((td)=> (<TodoLI todo={td} key={td.id} changeStatusTodo={todoListAPI.changeStatusTodo}
//              editTask={todoListAPI.editTask} deleteTodo={todoListAPI.deleteTodo} />))}
//             </ul>
//         </div>

//         // <div><button style={{textAlign:'center'}}onClick={()=>changeStatusTodosEdit(false)}>test!!!!</button></div>
//     )
 }




