
import { useState } from "react";

export interface itodoLi{
    title: string,
    id: number
    completed: boolean
}

export function TodosListHook(){

    // const test = 
    // [{title:'do something', id:Date.now(), completed: false},
    // {title:'do something else', id:Date.now()-1, completed: false},
    // {title:'do something 3', id:Date.now()+1, completed: false},
    // {title:'do something 4', id:Date.now()+2, completed: false},
    // {title:'do something 5', id:Date.now()+3, completed: false},
    // {title:'do something 6', id:Date.now()+4, completed: false},
    // {title:'do something 7', id:Date.now()+5, completed: false},
    // {title:'do something 8', id:Date.now()+6, completed: false},
    // {title:'do something 9', id:Date.now()+7, completed: false},
    // {title:'do something 10', id:Date.now()+8, completed: false},
    // {title:'do something 11', id:Date.now()+9, completed: false},
    // {title:'do something 12', id:Date.now()+10, completed: false}]
    
    const [ todoList, setTodoList ] = useState([{title:'do something', id:Date.now(), completed: false}]);
    // const [editListStatus, setEditListStatus] = useState(false)



    function updateTodosList(){
        if(localStorage.getItem('todoList')){
            setTodoList(JSON.parse(localStorage.getItem('todoList')))
        }
    }


    function addTodo(task: string){
        const newTodoList: itodoLi[] = todoList.map((td)=>td)
        newTodoList.push({
            title: task,
            id: Date.now(),
            completed: false
        })

        setTodoList(newTodoList)
        localStorage.setItem('todoList', JSON.stringify(newTodoList));
    }

    function deleteTodo(taskID: number){
        const newTodoList: itodoLi[] = todoList.filter(td => td.id !== taskID)
        setTodoList(newTodoList)
        localStorage.setItem('todoList', JSON.stringify(newTodoList));
    }

    function changeStatusTodo(taskID: number){
        const newTodoList: itodoLi[] = todoList.map((td) => (td.id === taskID ? {...td, completed:!td.completed}: td ))
        // console.log(`changed status of todo ${taskID}`)
        setTodoList(newTodoList);
        localStorage.setItem('todoList', JSON.stringify(newTodoList));
    }

    // function changeStatusTodosEdit(status: boolean){
    //     setEditListStatus(status)
    // }

    function editTask(TaskId:number, newTask:string){
        const newTodoList: itodoLi[] = todoList.map((td) => (td.id === TaskId ? {...td, completed:false, title:newTask}: td ))
        setTodoList(newTodoList)
        localStorage.setItem('todoList', JSON.stringify(newTodoList));
    }

    function progressValue(){
        
        let completed = todoList.filter((td)=>td.completed).length;
        return Math.round((completed/todoList.length)*100)

    }


    return {
        todoList,
        setTodoList,
        addTodo,
        deleteTodo,
        changeStatusTodo,
        // editListStatus,
        // changeStatusTodosEdit,
        editTask,
        progressValue,
        updateTodosList
    }

}