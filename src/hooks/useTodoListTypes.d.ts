

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

export type TtodosActions = keyof typeof todosReducerActions;

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