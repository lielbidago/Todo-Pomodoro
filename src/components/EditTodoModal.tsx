
import { useRef } from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {  todosReducerActions } from '../hooks/useTodoList';
import { itodoLi, ItodosReducerAction } from '../hooks/useTodoListTypes';

interface IEditTodoModalProps{
    toggleShowTodoModal():void,
    showTodoModal:boolean,
    todo:itodoLi,
    listDispatch(action:ItodosReducerAction):void
}


export function EditTodoModal(props:IEditTodoModalProps) {

    const {toggleShowTodoModal, showTodoModal, todo, listDispatch} = props

    const formRef = useRef<HTMLFormElement>(null)

    function onSave(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const formData = new FormData(formRef.current as HTMLFormElement);
        const payload = Object.fromEntries(formData)

        if (payload.todoTitle !== todo.task){
            listDispatch({
                type:todosReducerActions.editTask, 
                payload:{taskId:todo.id, newTask:payload.todoTitle as string}
            })
        }
        
        toggleShowTodoModal()

    }

    

    return (
    <>
        <Modal
            show={showTodoModal}
            onHide={toggleShowTodoModal}
            backdrop="static"
            keyboard={false}
            centered 
        >
            <Form onSubmit={onSave} ref={formRef}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Row>
                            <Col>
                                <InputGroup size="sm" className="mb-3">
                                    <InputGroup.Text>todo</InputGroup.Text>
                                    <Form.Control name="todoTitle" type='text' defaultValue={todo.task}/>
                            </InputGroup> 
                            </Col>
                        </Row>  
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={toggleShowTodoModal}>
                    Close
                    </Button>
                    <Button variant="dark" type="submit">Save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    </>
  );
}
