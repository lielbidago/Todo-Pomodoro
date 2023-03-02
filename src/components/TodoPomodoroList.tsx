import { itodoLi } from "../appHooks/todoListHook"
import { TodoLI } from "./TodoLI"

interface TodoPomodoListProps{
    todoList: itodoLi[]
    changeStatusTodo
}

export function TodoPomodoList(props: TodoPomodoListProps){
    
    const {todoList, changeStatusTodo} = props
// col
    return (
        <div className="TodoPomodoroList">
            <h4>My Todos</h4>
            <ul className="my-todos">
                {todoList.map((td:itodoLi)=> (<TodoLI todo={td} key={td.id} changeStatusTodo={changeStatusTodo}/>))}
            </ul>
        </div>
    )
}