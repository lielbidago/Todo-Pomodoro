import {  useRef } from "react";
import { itodoLi, TodosListHook } from "../appHooks/todoListHook";
import { TodoLI } from "./TodoLI";

interface TodosEditScreenProps{
    todoList: itodoLi[]
}

export function TodosEditScreen(props:TodosEditScreenProps){
    
    const inputRef = useRef(null);
    const {todoList, changeStatusTodo} = TodosListHook()
    
    return (
        <div>
            <input ref={inputRef} placeholder={'enter task here'}></input>
            <ul className="my-todos">
            {todoList.map((td:itodoLi)=> (<TodoLI todo={td} key={td.id} changeStatusTodo={changeStatusTodo}/>))}
            </ul>
        </div>


    )
}