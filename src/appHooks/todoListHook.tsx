import { useState } from "react";

export interface itodoLi{
    title: string,
    id: number
    completed: boolean
}

export function TodosListHook(){

    const [ todoList, setTodoList ] = useState([{title:'do something', id:Date.now(), completed: false}]);

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