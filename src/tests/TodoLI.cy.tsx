import React from 'react'
import { TodoLI } from '../components/TodoLI'


describe('<TodoLI />', () => {
  
  const changeStatusTodo = (TaskId:number) => {};
  const editTask = (TaskId:number, newTask:string)=>{};
  const deleteTodo = (TaskId:number) => {};
  const onDragStart = () => {};
  const onDragEnter = () => {};
  const onDragEnd = () => {};
  const todo1 = {id: 123, completed: false, task:'string to do'};
  const toggleHelpTips = false;
  // const showInput = true
  // const event:React.DragEvent<HTMLDivElement> = null;
  
  it('it should renders TodoLI', () => {

    cy.mount(<TodoLI todo={todo1} key={1} changeStatusTodo={changeStatusTodo} toggleHelpTips={toggleHelpTips}
    editTask={editTask} deleteTodo={deleteTodo} 
    onDragStart={onDragStart} onDragEnter={onDragEnter} onDragEnd={onDragEnd}/>)

    cy.get('li').should('have.attr', 'class', 'Todo-li');
    cy.get('.todo').should('exist')
    cy.get('input').should('have.attr', 'class', 'toggle')
    cy.get('label').should('have.text', 'string to do')
  })

  it('it should complete task in TodoLI', () => {

    const todo2 = {id: 123, completed: false, task:'string to do'};
    const changeStatusTodo = (TaskId:number) => {todo2.completed=!todo2.completed};

    cy.mount(<TodoLI todo={todo2} key={1} changeStatusTodo={changeStatusTodo} toggleHelpTips={toggleHelpTips}
    editTask={editTask} deleteTodo={deleteTodo} 
    onDragStart={onDragStart} onDragEnter={onDragEnter} onDragEnd={onDragEnd}/>)

    cy.get('input[type=checkbox]').check({force: true})
    cy.get('label').should('have.css', 'color', 'rgb(65, 72, 86)')

  })

  it('it should edit task in TodoLI', () => {

    const enter = cy.spy().as('enterNewTask');

    cy.mount(<TodoLI todo={todo1} key={1} changeStatusTodo={changeStatusTodo} toggleHelpTips={toggleHelpTips}
    editTask={enter} deleteTodo={deleteTodo} 
    onDragStart={onDragStart} onDragEnter={onDragEnter} onDragEnd={onDragEnd}/>)

    cy.get('label').dblclick()
    cy.get('input').type('{selectAll}{del}new task!!!');
    cy.get('input').type('{enter}')
    cy.get('@enterNewTask').should('have.been.calledWith', 123,'new task!!!');

  })




})