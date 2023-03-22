import { useEffect, useRef, useState } from "react"
import { itodoLi } from "../appHooks/todoListHook"
import { TodoLI } from "./TodoLI"
import * as XLSX from 'xlsx';

interface TodoPomodoListProps{
    todoList: itodoLi[]
    changeStatusTodo(taskID:number):void,
    addTodo(td:string):void,
    editTask(TaskId:number, newTask:string):void,
    deleteTodo(taskID:number):void
    updateTodosList():void,
    completedTasksCount: number,
    updateCompletedTasks():void
    todosTitle:string,
    changeTodosTitle(newName:string):void,
    updateTodosTitle():void

}

export function TodoPomodoList(props: TodoPomodoListProps){
    
    const {todoList, changeStatusTodo, addTodo, editTask,
         deleteTodo, updateTodosList, completedTasksCount, updateCompletedTasks,
         changeTodosTitle, todosTitle, updateTodosTitle} = props

    const inputRef = useRef(null);

    const [titleChange, setTitleChange]=useState(false);
    const titleRef = useRef(null);
    const dotsColor1 = localStorage.getItem('theme1');

    function onTaskEnter(event: React.KeyboardEvent<HTMLDivElement>){
        if(event.key === 'Enter'){
            if(inputRef.current.value!=='' && inputRef.current.value!==' '){
                addTodo(inputRef.current.value);
                inputRef.current.value = "";
            }
        }
    }

    function onEnterTask(event: React.MouseEvent<HTMLElement>){
        if(inputRef.current.value!=='' && inputRef.current.value!==' '){
            addTodo(inputRef.current.value);
            inputRef.current.value = "";
        }
    }

    function handleTitleChange(event: React.KeyboardEvent<HTMLDivElement>){
        if(event.key === 'Enter'){
            if(titleRef.current.value!=='' && titleRef.current.value!==' '){
                changeTodosTitle(titleRef.current.value);
                setTitleChange(false);
            }
        }
    }

    function exportTodoListFile(){

        const workbook = XLSX.utils.book_new()

        const exportedTodos = todoList.map((td)=>{
            const {task, completed} = td;
            return {task, completed};
        })
        const worksheet = XLSX.utils.json_to_sheet(exportedTodos)

        XLSX.utils.book_append_sheet(workbook, worksheet, 'TodoList')

        XLSX.writeFile(workbook, 'myTodos.xlsx')
      
    };

    useEffect(()=>{
        updateTodosList()
        updateTodosTitle()
    }, [])

    useEffect(()=>{
        updateCompletedTasks()
    }, [todoList])




    // const dotsColor2 = localStorage.getItem('theme2');
    // const gradient = {borderImage: `linear-gradient(90deg, ${dotsColor1}, ${dotsColor2}) 1`}

    return (
        <div className="TodoPomodoroList">
            <div className="todos-title" style={{borderTopColor: `${dotsColor1}`}}>
                {titleChange?<input type='text' ref={titleRef} onKeyUp={handleTitleChange}></input>:
                <h4 onDoubleClick={()=>{setTitleChange(true)}}>{todosTitle}</h4>}
                </div>
            <div className="EnterTodo">
                <input ref={inputRef} autoFocus placeholder={'Enter a task here...'} onKeyUp={onTaskEnter}/>
                <button type="button" className="btn btn-outline-dark" onClick={onEnterTask}>add task</button>
            </div>
            <ul className="my-todos">
                {todoList.map((td:itodoLi)=> (<TodoLI todo={td} key={td.id} changeStatusTodo={changeStatusTodo} editTask={editTask} deleteTodo={deleteTodo}/>))}
            </ul>
            <div className="todos-footer">
                <div className="completed">completed: {completedTasksCount}</div>
                <div className="all">all:{todoList.length}</div>
                <div className="export-to-excel">
                    <button type="button" className="btn btn-outline-dark" onClick={()=>{exportTodoListFile()}}>export to excel</button>
                </div>
                
            </div>
        </div>
    )
}