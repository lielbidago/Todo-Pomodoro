
import { useState } from "react";

export interface itodoLi{
    task: string,
    id: number
    completed: boolean
    timed: string | null
}

interface ItodosListState{
    todos:itodoLi[]
    title:string,
    completedNum:number,
    allNum:number
}

const todosActions = {
    allTodos:'allTodos',
    completedTodos:'completedTodos',
    nonCompletedTodos:'nonCompletedTodos',
    addTodo:'addTodo',
    deleteTodo:'deleteTodo',
    changeStatusTodo:'changeStatusTodo',
    editTask:'editTask',
    handleItemOrderChange:'handleItemOrderChange',
    changeTitle:'changeTitle',
    addTimeToTodo:'addTimeToTodo',
    cancelTimedTodo:'cancelTimedTodo',
    updateTodosState:'updateTodosState'

} as const;

export type TtodosActions = keyof typeof todosActions;

interface ItodosReducerAction{
    type:TtodosActions,
    payload:{
        filter?:string,
        task?:string,
        timed?:string|null,
        taskId?:number,
        newTask?:string,
        fromIndex?:number,
        toIndex?:number,
        newTitle?:string
    }
}


function todosComponentReducer(state:ItodosListState, action:ItodosReducerAction){
    
    let newTodosState:ItodosListState = {...state};
    
    switch(action.type){
        case todosActions.allTodos:
            return {...state};
        case todosActions.completedTodos:
            return {...state,todos:state.todos.filter(td => td.completed)};

        case todosActions.nonCompletedTodos:
            return {...state,todos:state.todos.filter(td => !td.completed)};

        case todosActions.addTodo:
            newTodosState = {...state, todos:[...state.todos,{
                task: action.payload.task,
                id: Date.now(),
                completed: false,
                timed:action.payload.timed
            } as itodoLi], allNum: state.allNum++};
            localStorage.setItem('todoList', JSON.stringify(newTodosState.todos));
            return newTodosState

        case todosActions.changeStatusTodo:
            newTodosState = {
                ...state,
                todos:state.todos.map((td) => (td.id === action.payload.taskId ? {...td, completed:!td.completed}: td )),
                completedNum:state.completedNum++,
            };
            localStorage.setItem('todoList', JSON.stringify(newTodosState.todos));
            return newTodosState

        case todosActions.deleteTodo:
            const tdtodelete = state.todos.filter((td) => (td.id === action.payload.taskId))[0]
            if (tdtodelete.completed){
                newTodosState = {
                    ...state,
                    todos:state.todos.filter((td) => (td.id !== action.payload.taskId)),
                    completedNum:state.completedNum--,
                    allNum:state.allNum--
                };
            }else{
                newTodosState = {
                    ...state,
                    todos:state.todos.filter((td) => (td.id !== action.payload.taskId)),
                    allNum:state.allNum--
                };
            }

            localStorage.setItem('todoList', JSON.stringify(newTodosState.todos));
            return newTodosState

        case todosActions.editTask:
            newTodosState =  {
                ...state,
                todos:state.todos.map((td) => (td.id === action.payload.taskId ?
                    {...td, task:action.payload.newTask} as itodoLi: td )),
            };
            localStorage.setItem('todoList', JSON.stringify(newTodosState.todos));
            return newTodosState;

        case todosActions.handleItemOrderChange:
            
            const newTodoList = [...state.todos]
            const draggedItem = newTodoList.splice(action.payload.fromIndex!, 1)[0] //delete draggedItem from list and save it
            newTodoList.splice(action.payload.toIndex!, 0, draggedItem) // insert draggedItem in the index: toIndex
            
            newTodosState = {...state, todos:newTodoList}
            localStorage.setItem('todoList', JSON.stringify(newTodoList));
            return newTodosState;

        case todosActions.changeTitle:

            newTodosState = {...state, title:action.payload.newTitle!}
            localStorage.setItem('todosTitle', action.payload.newTitle!)
            return newTodosState;

        case todosActions.addTimeToTodo:
            newTodosState = {
                ...state,
                todos:state.todos.map((td) => (td.id === action.payload.taskId ? 
                    {...td, timed:action.payload.timed} as itodoLi: td ))
            };
            localStorage.setItem('todoList', JSON.stringify(newTodosState.todos));
            return newTodosState

        case todosActions.cancelTimedTodo:
            newTodosState = {
                ...state,
                todos:state.todos.map((td) => (td.id === action.payload.taskId ? 
                    {...td, timed:null} as itodoLi: td ))
            };
            localStorage.setItem('todoList', JSON.stringify(newTodosState.todos));
            return newTodosState

        case todosActions.updateTodosState:

            const localStoragelist = localStorage.getItem('todoList')
            const localStorageTitle = localStorage.getItem('todosTitle')

            if(localStoragelist){
                newTodosState.todos = JSON.parse(localStoragelist)
            }
            if(localStorageTitle){
                newTodosState.title = localStorageTitle
            }
            
            return newTodosState

        default:
            throw Error('unfamiliar todos action')
        
        
        

    }
}

export function useTodosListHook(){

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

    const defaultList:itodoLi[] = [{task:'do something', id:Date.now(),
     completed: false, timed:null}]; 
    const [ todoList, setTodoList ] = useState(defaultList);
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

    function progressValue(){
        let completed = todoList.filter((td)=>td.completed).length;
        return Math.round((completed/todoList.length)*100)
    }

    function changeTodosTitle(newName:string){
        setTodosTitle(newName);
        localStorage.setItem('todosTitle', newName)
    }


    function addTodo(task: string, timed:string|null){
        const newTodoList: itodoLi[] = todoList.map((td)=>td)
        newTodoList.push({
            task: task,
            id: Date.now(),
            completed: false,
            timed:timed
        })

        console.log(`added task: '${task}' and timed is: '${timed}'`)

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


    function updateCompletedTasks(){
        setCompletedTasksCount(todoList.filter((td) => (td.completed)).length) 
    }

    function handleItemOrderChange(fromIndex:number, toIndex:number){
        const newTodoList = [...todoList]
        const draggedItem = newTodoList.splice(fromIndex, 1)[0] //delete draggedItem from list and save it
        newTodoList.splice(toIndex, 0, draggedItem) // insert draggedItem in the index: toIndex
        setTodoList(newTodoList)
    }
//NodeJS.Timer
    function timeTodo(taskID:number, timed:string){
        console.log(`entered timeTodo with taskID: ${taskID} and timed: ${timed}`)
        const newTodoList: itodoLi[] = todoList.map((td:itodoLi) => (td.id === taskID ? {...td, timed:timed}: td ))
        setTodoList(newTodoList);
        localStorage.setItem('todoList', JSON.stringify(newTodoList));
    }

    function addTimeToTodo(taskID:number, timeto:string){
        console.log(`entered addTimeToTodo with taskID: ${taskID} and timeto: ${timeto}`)
        const newTodoList: itodoLi[] = todoList.map((td) => (td.id === taskID ? {...td, timed:timeto}: td ))
        setTodoList(newTodoList);
        localStorage.setItem('todoList', JSON.stringify(newTodoList));
    }

    function cancelTimedTodo(taskID:number){

        const timedTask = todoList.filter((td)=> td.id === taskID)

        if (timedTask.length !== 0){
            clearInterval(timedTask[0].timed ||= '')
        }
        const newTodoList: itodoLi[] = todoList.map((td) => (td.id === taskID ? {...td, timed:null}: td ))
        console.log(   `canceled timed task : ${taskID}`)
        setTodoList(newTodoList)
        localStorage.setItem('todoList', JSON.stringify(newTodoList));
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
        handleItemOrderChange,
        timeTodo,
        cancelTimedTodo,
        addTimeToTodo
    }

}