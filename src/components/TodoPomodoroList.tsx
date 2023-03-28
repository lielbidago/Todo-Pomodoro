import React, { useEffect, useRef, useState } from "react"
import { itodoLi } from "../appHooks/todoListHook"
import { TodoLI } from "./TodoLI"
import * as XLSX from 'xlsx';
import FilterDropDown from "./FilterDropDown";

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
    updateTodosTitle():void,
    handleItemOrderChange(fromIndex:number, toIndex:number):void

}

export function TodoPomodoList(props: TodoPomodoListProps){
    
    const {todoList, changeStatusTodo, addTodo, editTask,
         deleteTodo, updateTodosList, completedTasksCount, updateCompletedTasks,
         changeTodosTitle, todosTitle, updateTodosTitle, handleItemOrderChange} = props

    const inputRef = useRef(null);

    const [todosFilter, setTodosFilter] = useState('all')
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

    const draggedItemRef = useRef(null);
    const draggedOverItemRef = useRef(null);

    function onDragStart(e:React.DragEvent<HTMLDivElement>, index:number){
        draggedItemRef.current = index
    }

    function onDragEnter(e:React.DragEvent<HTMLDivElement>, index:number){
        draggedOverItemRef.current = index
    }


    function onDragEnd(e:React.DragEvent<HTMLDivElement>, index:number){
        handleItemOrderChange(draggedItemRef.current,draggedOverItemRef.current)
        draggedItemRef.current = null
        draggedOverItemRef.current = null

    }

    useEffect(()=>{
        updateTodosList()
        updateTodosTitle()
    }, [])

    useEffect(()=>{
        updateCompletedTasks()
    }, [todoList])

    
    function handleFilterTodos(filter:string){
        setTodosFilter(filter)
    }

    // const dotsColor2 = localStorage.getItem('theme2');
    // const gradient = {borderImage: `linear-gradient(90deg, ${dotsColor1}, ${dotsColor2}) 1`}

    return (
        <div className="TodoPomodoroList">
            <div className="todos-title" style={{borderTopColor: `${dotsColor1}`}}>
                {titleChange?<input type='text' ref={titleRef} onKeyUp={handleTitleChange}></input>:
                <h4 onDoubleClick={()=>{setTitleChange(true)}}>{todosTitle}</h4>}
                </div>
            <div className="EnterTodo">
                {/* <button className="filter"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path></svg></button> */}
                <FilterDropDown handleFilterTodos={handleFilterTodos}/>
                <input ref={inputRef} autoFocus placeholder={'Enter a task here...'} onKeyUp={onTaskEnter}/>
                <button type="button" className="btn btn-outline-dark" onClick={onEnterTask}>add task</button>
                
            </div>
            <div className="my-todos" >
            <ul >  
                {todosFilter==='all'&&
                    todoList.map((td:itodoLi, index)=> 
                    (<TodoLI todo={td} key={index} changeStatusTodo={changeStatusTodo}
                  editTask={editTask} deleteTodo={deleteTodo} 
                  onDragStart={(e)=>onDragStart(e,index)} onDragEnter={(e)=>onDragEnter(e,index)} onDragEnd={(e)=> onDragEnd(e,index)}/>))
                }

                {todosFilter==='completed'&&todoList.filter(td => td.completed).map((td:itodoLi, index)=> 
                  (<TodoLI todo={td} key={index} changeStatusTodo={changeStatusTodo}
                    editTask={editTask} deleteTodo={deleteTodo} 
                    onDragStart={(e)=>onDragStart(e,index)} onDragEnter={(e)=>onDragEnter(e,index)} onDragEnd={(e)=> onDragEnd(e,index)}/>))
                }

                {todosFilter==='noncompleted'&&todoList.filter(td => !td.completed).map((td:itodoLi, index)=> 
                  (<TodoLI todo={td} key={index} changeStatusTodo={changeStatusTodo}
                    editTask={editTask} deleteTodo={deleteTodo} 
                    onDragStart={(e)=>onDragStart(e,index)} onDragEnter={(e)=>onDragEnter(e,index)} onDragEnd={(e)=> onDragEnd(e,index)}/>))
                }

            </ul>                
            </div>
            <div className="todos-footer">
                <div className="completed"><div className="bold">completed:</div> {completedTasksCount}</div>
                <div className="all"><div className="bold">all:</div> {todoList.length}</div>
                <div className="export-to-excel">
                    <button type="button" className="btn btn-outline-dark" onClick={()=>{exportTodoListFile()}}>export to excel</button>
                </div>
                
            </div>
        </div>
    )
}