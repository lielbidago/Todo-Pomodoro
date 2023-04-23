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
  const toggleShowTodoModal = () => {};
  // const showInput = true
  // const event:React.DragEvent<HTMLDivElement> = null;
  
  it('it should renders TodoLI', () => {

    cy.mount(<TodoLI key={1}  props = {{todo:todo1, changeStatusTodo, toggleHelpTips, editTask, deleteTodo, toggleShowTodoModal, onDragStart,
      onDragEnter, onDragEnd}}/>)

    cy.get('li').should('have.attr', 'class', 'Todo-li');
    cy.get('.todo').should('exist')
    cy.get('input').should('have.attr', 'class', 'toggle')
    cy.get('label').should('have.text', 'string to do')
  })

  it('it should complete task in TodoLI', () => {

    const todo2 = {id: 123, completed: false, task:'string to do'};
    const changeStatusTodo = (TaskId:number) => {todo2.completed=!todo2.completed};

    cy.mount(<TodoLI key={1}  props = {{todo:todo2, changeStatusTodo, toggleHelpTips, editTask, deleteTodo, toggleShowTodoModal, onDragStart,
      onDragEnter, onDragEnd}}/>)

    cy.get('input[type=checkbox]').check({force: true})
    cy.get('label').should('have.css', 'color', 'rgb(65, 72, 86)')

  })

  it('it should edit task in TodoLI', () => {

    const enter = cy.spy().as('enterNewTask');

    cy.mount(<TodoLI key={1}  props = {{todo:todo1, changeStatusTodo, toggleHelpTips, editTask, deleteTodo, toggleShowTodoModal, onDragStart,
      onDragEnter, onDragEnd}}/>)



    cy.get('label').dblclick()
    cy.get('input').type('{selectAll}{del}new task!!!');
    cy.get('input').type('{enter}')
    cy.get('@enterNewTask').should('have.been.calledWith', 123,'new task!!!');

  })




})