
import { useState } from "react";

export interface itodoLi{
    task: string,
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
    
    const [ todoList, setTodoList ] = useState([{task:'do something', id:Date.now(), completed: false}]);
    const [completedTasksCount, setCompletedTasksCount] = useState(0);
    const [todosTitle, setTodosTitle] = useState('My Todos');

    


    function updateTodosList(){
        const localStoragelist = localStorage.getItem('todoList')
        if(localStoragelist){
            setTodoList(JSON.parse(localStoragelist))
        }
    }

    function updateTodosTitle(){
        const localStorageTitle = localStorage.getItem('todosTitle')
        if(localStorageTitle){
            setTodosTitle(localStorageTitle)
        }
    }

    

    function changeTodosTitle(newName:string){
        setTodosTitle(newName);
        localStorage.setItem('todosTitle', newName)
    }


    function addTodo(task: string){
        const newTodoList: itodoLi[] = todoList.map((td)=>td)
        newTodoList.push({
            task: task,
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
        setTodoList(newTodoList);
        localStorage.setItem('todoList', JSON.stringify(newTodoList));
    }


    function editTask(TaskId:number, newTask:string){
        const newTodoList: itodoLi[] = todoList.map((td) => (td.id === TaskId ? {...td, completed:false, task:newTask}: td ))
        setTodoList(newTodoList)
        localStorage.setItem('todoList', JSON.stringify(newTodoList));
    }

    function progressValue(){
        let completed = todoList.filter((td)=>td.completed).length;
        return Math.round((completed/todoList.length)*100)
    }

    function updateCompletedTasks(){
        setCompletedTasksCount(todoList.filter((td) => (td.completed)).length) 
    }

    function handleItemOrderChange(fromIndex:number, toIndex:number){
        const newTodoList = [...todoList]
        const draggedItem = newTodoList.splice(fromIndex, 1)[0] //delete draggedItem from list and save it
        newTodoList.splice(toIndex, 0, draggedItem) // insert draggedItem in the index: toIndex
        setTodoList(newTodoList)
    }


    return {
        todoList,
        setTodoList,
        addTodo,
        deleteTodo,
        changeStatusTodo,
        editTask,
        progressValue,
        updateTodosList,
        completedTasksCount,
        updateCompletedTasks,
        todosTitle,
        changeTodosTitle,
        updateTodosTitle,
        handleItemOrderChange
    }

}