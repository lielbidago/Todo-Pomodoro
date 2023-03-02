import { useState } from "react";

export interface itodoLi{
    title: string,
    id: number
    completed: boolean
}

export function TodosListHook(){

    const test = 
    [{title:'do something', id:Date.now(), completed: false},
    {title:'do something else', id:Date.now()-1, completed: false},
    {title:'do something 3', id:Date.now()+1, completed: false},
    {title:'do something 4', id:Date.now()+2, completed: false},
    {title:'do something 5', id:Date.now()+3, completed: false},
    {title:'do something 6', id:Date.now()+4, completed: false},
    {title:'do something 7', id:Date.now()+5, completed: false},
    {title:'do something 8', id:Date.now()+6, completed: false},
    {title:'do something 9', id:Date.now()+7, completed: false},
    {title:'do something 10', id:Date.now()+8, completed: false},
    {title:'do something 11', id:Date.now()+9, completed: false},
    {title:'do something 12', id:Date.now()+10, completed: false}]
    const [ todoList, setTodoList ] = useState(test);

    function addTodo(task: string){
        const newTodoList: itodoLi[] = todoList.map((td)=>td)
        newTodoList.push({
            title: task,
            id: Date.now(),
            completed: false
        })

        setTodoList(newTodoList)
    }

    function deleteTodo(taskID: number){
        const newTodoList: itodoLi[] = todoList.filter(td => td.id != taskID)
        setTodoList(newTodoList)
    }

    function changeStatusTodo(taskID: number){
        const newTodoList: itodoLi[] = todoList.map((td) => (td.id === taskID ? {...td, completed:!td.completed}: td ))
        console.log(`changed statis of todo ${taskID}`)
        setTodoList(newTodoList)
    }


    return {
        todoList,
        setTodoList,
        addTodo,
        deleteTodo,
        changeStatusTodo,

    }

}