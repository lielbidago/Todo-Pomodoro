
import { useReducer } from "react";

export interface itodoLi{
    task: string,
    id: number
    completed: boolean
    timed: string | null
}

export interface ItodosListState{
    todos:itodoLi[]
    title:string,
    completedNum:number,
    allNum:number
}

export const todosActions = {
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

export interface ItodosReducerAction{
    type:TtodosActions,
    payload:{
        task?:string,
        timed?:string|null,
        taskId?:number,
        newTask?:string,
        fromIndex?:number,
        toIndex?:number,
        newTitle?:string,

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
            const tdbool = state.todos.filter(td => td.id === action.payload.taskId)[0].completed

            newTodosState = {
                ...state,
                todos:state.todos.map((td) => (td.id === action.payload.taskId ? {...td, completed:!td.completed}: td )),
                completedNum:tdbool?state.completedNum--:state.completedNum++,
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

            newTodosState.allNum = newTodosState.todos.length
            newTodosState.completedNum = newTodosState.todos.filter((td)=>td.completed).length
            return newTodosState

        default:
            throw Error('unfamiliar todos action')
        

    }
}

export function useTodoListState(){

    const defaultList:itodoLi[] = 
    [{task:'do something', id:Date.now(),completed: false, timed:null}]; 

    const defaultState:ItodosListState = 
    {todos:defaultList, title:'My Todos', allNum:1,completedNum:0};

    const [todosCompState, dispatch] = useReducer(todosComponentReducer, defaultState)


    return { todosCompState, dispatch}
}

