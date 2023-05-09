import { useEffect, useRef, useState } from "react"
import {  todosReducerActions,  } from "../hooks/useTodoList"
import { itodoLi, ItodosReducerAction, ItodosListState } from '../hooks/useTodoListTypes';
import { TodoLI } from "./TodoLI"
import * as XLSX from 'xlsx';
import FilterDropDown from "./FilterDropDown";
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import useToast from "../hooks/useToast";
import { Toast } from "react-bootstrap";

interface TodoPomodoListProps{
    todosCompState:ItodosListState,
    listDispatch(action:ItodosReducerAction):void,
    toggleHelpTips: boolean,

}

const todosFilter = {
    allTodos:'allTodos',
    completedTodos:'completedTodos',
    nonCompletedTodos:'nonCompletedTodos',
} as const

export type TtodosFilter = keyof typeof todosFilter;

export function TodoPomodoList(props: TodoPomodoListProps){
    
    const {todosCompState, listDispatch, toggleHelpTips} = props

    const inputRef = useRef<HTMLInputElement>(null);
    const [titleChange, setTitleChange] = useState(false);
    const titleRef = useRef<HTMLInputElement>(null);
    const {showToast, toggleShowToast} = useToast()
    const todosRef = useRef(todosCompState.todos)
    const dotsColor1 = localStorage.getItem('innerColor');
    const draggedItemRef = useRef<null|number>(null);
    const draggedOverItemRef = useRef<null|number>(null);
    const [filterMode, setFilterMode] = useState<TtodosFilter>('allTodos')

    function onTaskEnter(event: React.KeyboardEvent<HTMLDivElement>){
        if(event.key === 'Enter'){
            if( inputRef.current && inputRef.current.value !=='' && inputRef.current.value!==' '){
                listDispatch({type:todosReducerActions.addTodo,payload: {task:inputRef.current?.value as string, timed:null}});
                inputRef.current.value = "";
            }
        }
    }
    function onEnterTask(event: React.MouseEvent<HTMLElement>){
        if(inputRef.current && inputRef.current.value!=='' && inputRef.current.value!==' '){
            listDispatch({type:todosReducerActions.addTodo,payload: {task:inputRef.current?.value as string, timed:null}});
            inputRef.current.value = "";
        }
    }
    function handleTitleChange(event: React.KeyboardEvent<HTMLDivElement>){
        if(event.key === 'Enter'){
            if(titleRef.current && titleRef.current.value!=='' && titleRef.current.value!==' '){
                listDispatch({type:todosReducerActions.changeTitle,payload: {newTitle:titleRef.current.value as string}});
                setTitleChange(false);
            }
        }
    }
    function exportTodoListFile(){

        const workbook = XLSX.utils.book_new()

        const exportedTodos = todosCompState.todos.map((td)=>{
            const {task, completed} = td;
            return {task, completed};
        })
        const worksheet = XLSX.utils.json_to_sheet(exportedTodos)

        XLSX.utils.book_append_sheet(workbook, worksheet, 'myTodos')

        XLSX.writeFile(workbook, `${todosCompState.title}.xlsx`)
      
    };

    function onDragStart(e:React.DragEvent<HTMLLIElement>, index:number){
        draggedItemRef.current = index
    }

    function onDragEnter(e:React.DragEvent<HTMLLIElement>, index:number){
        draggedOverItemRef.current = index
    }


    function onDragEnd(e:React.DragEvent<HTMLLIElement>){
        listDispatch({type:todosReducerActions.handleItemOrderChange,payload: {
            fromIndex:draggedItemRef.current as number,
            toIndex:draggedOverItemRef.current as number
        }});
        draggedItemRef.current = null
        draggedOverItemRef.current = null
    }


    useEffect(()=>{

        console.log(`entered useEffect of timed Tasks`)
        const todoListTimeouts = todosCompState.todos.map((td)=>{
            if (td.timed){
                console.log('entered if (td.timed)')
                const hour = Number(td.timed.slice(0,2))
                const minutes = Number(td.timed.slice(3))

                const targetTime = new Date();
                targetTime.setHours(hour);
                targetTime.setMinutes(minutes);
                targetTime.setSeconds(0);

                let timeDiff = targetTime.getTime() - Date.now();

                if (timeDiff < 0){
                    timeDiff += 24 * 60 * 60 * 1000;
                }

                const timeout = setTimeout(() => {
                    const todo = todosRef.current.filter((todo)=> todo.id === td.id)

                    if (todo.length === 0){
                        console.log('entered addTimedTodo')
                        listDispatch({type:todosReducerActions.addTodo,payload: {task:td.task, timed:td.timed}});

                        toggleShowToast()
                    }

                }, timeDiff);
                return timeout
            }
        })

        return ()=>{ todoListTimeouts.forEach((tdTimeout)=>{ clearTimeout(tdTimeout)})}

    }, [todosCompState.todos, toggleShowToast ])

    
    function handleFilterTodos(filter:TtodosFilter){        
        setFilterMode(filter)
    }

    
    const todosTitleRef = useRef(null)
    const addButtonRef = useRef(null)
    const excelButton = useRef(null)



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
                {titleChange?<input type='text' defaultValue={todosCompState.title} ref={titleRef} onKeyUp={handleTitleChange}></input>:
                <h4 onDoubleClick={()=>{setTitleChange(true)}} ref={todosTitleRef}>{todosCompState.title}</h4>}
            </div>
            <div className="EnterTodo">
                <FilterDropDown handleFilterTodos={handleFilterTodos} toggleHelpTips={toggleHelpTips} />
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
                {filterMode==='allTodos'&&
                    todosCompState.todos.map((td:itodoLi, index)=> 
                    (<TodoLI key={index}
                   todo={td} toggleHelpTips={toggleHelpTips} 
                   listDispatch={listDispatch}
                   onDragStart={(e:React.DragEvent<HTMLLIElement>)=> {onDragStart(e,index)}}
                    onDragEnter={(e:React.DragEvent<HTMLLIElement>) => {onDragEnter(e,index)}} 
                    onDragEnd={(e:React.DragEvent<HTMLLIElement>) => {onDragEnd(e)}}
                  />))
                }

                
                {filterMode==='completedTodos'&&
                todosCompState.todos.filter(td => td.completed).map((td:itodoLi, index)=> 
                (<TodoLI key={index}
                    todo={td} toggleHelpTips={toggleHelpTips} 
                    listDispatch={listDispatch}
                    onDragStart={(e:React.DragEvent<HTMLLIElement>)=> {onDragStart(e,index)}}
                     onDragEnter={(e:React.DragEvent<HTMLLIElement>) => {onDragEnter(e,index)}} 
                     onDragEnd={(e:React.DragEvent<HTMLLIElement>) => {onDragEnd(e)}}
                   />))
                }

                {filterMode==='nonCompletedTodos'&&
                todosCompState.todos.filter(td => !td.completed).map((td:itodoLi, index)=> 
                (<TodoLI key={index}
                    todo={td} toggleHelpTips={toggleHelpTips} 
                    listDispatch={listDispatch}
                    onDragStart={(e:React.DragEvent<HTMLLIElement>)=> {onDragStart(e,index)}}
                     onDragEnter={(e:React.DragEvent<HTMLLIElement>) => {onDragEnter(e,index)}} 
                     onDragEnd={(e:React.DragEvent<HTMLLIElement>) => {onDragEnd(e)}}
                   />))
                }

                

            </ul>                
            </div>

            </div>
            <div className="todos-footer">
                <div className="completed"><div className="bold">completed:</div> {todosCompState.completedNum}</div>
                <div className="all"><div className="bold">all:</div> {todosCompState.allNum}</div>
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
            <Toast show={showToast} onClose={toggleShowToast}>
                    <Toast.Header>
                        <strong className="me-auto">todo Pomodoro</strong>
                    </Toast.Header>
                    <Toast.Body>New Task Added!</Toast.Body>
                </Toast>
        </div>

    )
}

