import {itodoLi} from '../appHooks/todoListHook'

interface TodoLIProps{
    changeStatusTodo,
    todo: {id: number, completed: boolean, title:string}

}
export function TodoLI(props: TodoLIProps){
    const {changeStatusTodo} = props
    const {id, completed, title} = props.todo

    return (
        <li className="Todo-li" id={'li-'+ id.toString()}>
            <div className='checkbox-wrapper-11'>
                <input className="toggle" type="checkbox" checked={completed} onChange = {()=>changeStatusTodo(id)}></input>
                <label>{title}</label> 
            </div>

            

        </li>
    )
}