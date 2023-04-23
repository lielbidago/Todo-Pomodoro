import React, { useEffect, useRef, useState } from "react"
import { itodoLi } from "../appHooks/todoListHook"
import { TodoLI } from "./TodoLI"
import * as XLSX from 'xlsx';
import FilterDropDown from "./FilterDropDown";
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { TimedTodoModal } from "./TimedTodoModal";

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
    handleItemOrderChange(fromIndex:number, toIndex:number):void,
    toggleHelpTips: boolean,
    timeTodo(taskID:number, intervalID:NodeJS.Timer):void,
    cancelTimedTodo

}

// interface ItimedTodo{
//     taskId: number,
//     time:{
//         hour:number,
//         minutes:number
//     }
// }

export function TodoPomodoList(props: TodoPomodoListProps){
    
    const {todoList, changeStatusTodo, addTodo, editTask,
         deleteTodo, updateTodosList, completedTasksCount, updateCompletedTasks,
         changeTodosTitle, todosTitle, updateTodosTitle, handleItemOrderChange,
          toggleHelpTips, timeTodo, cancelTimedTodo} = props

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

        XLSX.utils.book_append_sheet(workbook, worksheet, 'myTodos')

        XLSX.writeFile(workbook, `${todosTitle}.xlsx`)
      
    };

    const draggedItemRef = useRef(null);
    const draggedOverItemRef = useRef(null);
    

    function onDragStart(e:React.DragEvent<HTMLDivElement>, index:number){
        draggedItemRef.current = index
    }

    function onDragEnter(e:React.DragEvent<HTMLDivElement>, index:number){
        draggedOverItemRef.current = index
    }


    function onDragEnd(e:React.DragEvent<HTMLDivElement>){
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

    const FilterDropDownRef = useRef(null)
    const todosTitleRef = useRef(null)
    const addButtonRef = useRef(null)
    const excelButton = useRef(null)

    function setTimedTodo(timeToSet:string, taskID:number){
        console.log(   `entered setTimedTodo with: ${timeToSet} and id: ${taskID}`)
        const hour = Number(timeToSet.slice(0,2))
        const minutes = Number(timeToSet.slice(3))

        const targetTime = new Date();
        targetTime.setHours(hour);
        targetTime.setMinutes(minutes);
        targetTime.setSeconds(0);

        let timeDiff = targetTime.getTime() - Date.now();

        if (timeDiff < 0){
            timeDiff += 24 * 60 * 60 * 1000;
        }

        const todo = todoList.filter((td)=> td.id === taskID)[0]
        
        setTimeout(()=>{

            const taskInterval = setInterval(()=>{
                const task = todoList.filter((td)=> td.task === todo.task)
                if (task.length === 0){
                    addTodo(todo.task)
                }
            }, 24 * 60 * 60 * 1000)

            timeTodo(taskID, taskInterval)

        }, timeDiff)
        
    }

    return (
        <div className="list-container">

            <div className="TodoPomodoroList">
            <div className="todos-title" style={{borderTopColor: `${dotsColor1}`}}>
                <Overlay target={todosTitleRef.current} show={toggleHelpTips} placement='right'>
                {(props) => (
                    <Tooltip {...props}>
                        change the list title
                    </Tooltip>
                )} 
                </Overlay>
                {titleChange?<input type='text' defaultValue={todosTitle} ref={titleRef} onKeyUp={handleTitleChange}></input>:
                <h4 onDoubleClick={()=>{setTitleChange(true)}} ref={todosTitleRef}>{todosTitle}</h4>}
            </div>
            <div className="EnterTodo">
                <FilterDropDown FilterDropDownRef={FilterDropDownRef} handleFilterTodos={handleFilterTodos}/>
                <Overlay target={FilterDropDownRef.current} show={toggleHelpTips} placement='top'>
                {(props) => (
                    <Tooltip {...props}>
                        filter your tasks
                    </Tooltip>
                )}   
                </Overlay>
                
                <input ref={inputRef} autoFocus placeholder={'Enter a task here...'} onKeyUp={onTaskEnter}/>
                <button type="button" className="btn btn-outline-dark" onClick={onEnterTask} ref={addButtonRef}>add task</button>
                <Overlay target={addButtonRef.current} show={toggleHelpTips} placement='right'>
                {(props) => (
                    <Tooltip {...props}>
                        add a task to the list
                    </Tooltip>
                )} 
                </Overlay>
                
            </div>
            <div className="todos-main">
            <div className="my-todos" >
            <ul >  
                {todosFilter==='all'&&
                    todoList.map((td:itodoLi, index)=> 
                    (<TodoLI key={index}
                  props = {{todo:td, changeStatusTodo, toggleHelpTips, editTask, deleteTodo, onDragStart:(e)=> onDragStart(e,index),
                    onDragEnter:(e) => {onDragEnter(e,index)}, onDragEnd:(e) => {onDragEnd(e)}, setTimedTodo, cancelTimedTodo}}
                  />))
                }

                {todosFilter==='completed'&&todoList.filter(td => td.completed).map((td:itodoLi, index)=> 
                    (<TodoLI key={index}
                        props = {{todo:td, changeStatusTodo, toggleHelpTips, editTask, deleteTodo, onDragStart:(e)=> onDragStart(e,index),
                          onDragEnter:(e) => {onDragEnter(e,index)}, onDragEnd:(e) => {onDragEnd(e)}, setTimedTodo, cancelTimedTodo}}/>))
                }

                {todosFilter==='noncompleted'&&todoList.filter(td => !td.completed).map((td:itodoLi, index)=> 
                    (<TodoLI key={index}
                        props = {{todo:td, changeStatusTodo, toggleHelpTips, editTask, deleteTodo, onDragStart:(e)=> onDragStart(e,index),
                          onDragEnter:(e) => {onDragEnter(e,index)}, onDragEnd:(e) => {onDragEnd(e)} , setTimedTodo, cancelTimedTodo}}/>))
                }

            </ul>                
            </div>

            </div>
            <div className="todos-footer">
                <div className="completed"><div className="bold">completed:</div> {completedTasksCount}</div>
                <div className="all"><div className="bold">all:</div> {todoList.length}</div>
                <div className="export-to-excel">
                    <button type="button" className="btn btn-outline-dark" ref={excelButton} onClick={()=>{exportTodoListFile()}}>export to excel</button>
                    <Overlay target={excelButton.current} show={toggleHelpTips} placement='top'>
                        {(props) => (
                            <Tooltip {...props}>
                                export the list to excel
                            </Tooltip>
                        )} 
                    </Overlay>
                </div>
                
            </div>
        </div>
        </div>

    )
}