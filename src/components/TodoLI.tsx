import {todoLi} from '../appHooks/todoListHook'

// get list li id and details as parameter

export function TodoLI(props: todoLi){
    
    return (
        <li className="Todo-li" id={'li-'+props.id.toString()}>
            <input className="toggle" type="checkbox" checked={props.completed}></input>
            <label>{props.title}</label>
        </li>
    )
}