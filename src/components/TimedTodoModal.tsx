
import { useRef, useState } from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function TimedTodoModal({props}) {

    const {toggleShowTodoModal, showTodoModal, todo, setTimedTodo, cancelTimedTodo, editTask} = props
    const formRef = useRef(null)
    const [isTimed, setIsTimed] = useState(todo.timed !== null? true:false)

    const changeIsTimed = ()=>{setIsTimed(!isTimed)}

    function onSave(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const formData = new FormData(formRef.current);
        const payload = Object.fromEntries(formData)

        console.log(payload.timeOfTodo, payload.timeOfTodo==='', payload.todoTitle)

        if (payload.todoTitle !== todo.task){
            editTask(payload.todoTitle)
        }

        if (payload.checked && payload.timeOfTodo !=='' && todo.timed === null){
            setTimedTodo(payload.timeOfTodo, todo.id)
        }

        if (!payload.checked && todo.timed !== null){
            cancelTimedTodo(todo.id)
        }

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
