import { useState } from "react";

export interface todoLi{
    title: string,
    id: number
    completed: boolean
}

export function todosHook(){

    const [ todoList, setTodoList ] = useState([]);

    function addTodo(task: string){
        const newTodoList: todoLi[] = todoList.map((td)=>td)
        newTodoList.push({
            title: task,
            id: Date.now(),
            completed: false
        })

        setTodoList(newTodoList)
    }

    function deleteTodo(taskID: number){
        const newTodoList = todoList.filter(td => td.id != taskID)
        setTodoList(newTodoList)
    }

    function changeStatusTodo(taskID: number){
        const newTodoList: todoLi[] = todoList.map((td) => (td.id === taskID ? {...td, completed:!td.completed}: td ))
        setTodoList(newTodoList)
    }



}