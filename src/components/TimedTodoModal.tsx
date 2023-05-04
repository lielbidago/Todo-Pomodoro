
import { useRef, useState } from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { itodoLi } from '../hooks/usedTodoListHook';


interface ITimedTodoModalProps{
    toggleShowTodoModal():void,
    showTodoModal:boolean,
    todo:itodoLi,
    setTimedTodo(timeToSet:string, taskID:number):void,
    cancelTimedTodo(taskID:number):void,
    editTask(TaskId:number, newTask:string):void,
    addTimeToTodo(taskID:number, timeto:string):void
}


export function TimedTodoModal(props:ITimedTodoModalProps) {

    const {toggleShowTodoModal, showTodoModal, todo, setTimedTodo, cancelTimedTodo, editTask, addTimeToTodo} = props
    const formRef = useRef<HTMLFormElement>(null)
    const [isTimed, setIsTimed] = useState(todo.timed !== null? true:false)

    const changeIsTimed = ()=>{setIsTimed(!isTimed)}

    function onSave(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const formData = new FormData(formRef.current as HTMLFormElement);
        const payload = Object.fromEntries(formData)

        if (payload.todoTitle !== todo.task){
            editTask(todo.id, payload.todoTitle as string)
        }

        if (payload.checked && payload.timeOfTodo !=='' && todo.timed === null){
            // setTimedTodo(payload.timeOfTodo, todo.id)
            addTimeToTodo(todo.id, payload.timeOfTodo as string)
        }

        if (!payload.checked && todo.timed){
            cancelTimedTodo(todo.id)
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
                        <Row>
                            <Col>
                                <Form.Check name="checked" 
                                onChange={()=> changeIsTimed()}
                                label='Add task to my todo list everyday' 
                                defaultChecked={isTimed}/>
                            </Col>
                        </Row>
                        <br></br>
                        <Row>
                            <Col>
                                <Form.Label>
                                    at:
                                </Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="timeOfTodo" 
                                type="time" disabled={!isTimed}
                                 />
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
