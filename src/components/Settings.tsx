
import { useState, useRef, useContext } from 'react';
import { Button, Offcanvas, Form, InputGroup, Col, Row  } from 'react-bootstrap';
import {appContext} from '../context/appContext'

export function Settings({showSettings, handleCloseSettings, setSessionAndBreakLen}){
    
    const {getCustomeThemes} = useContext(appContext);
    const formRef = useRef(null)
    
    function submitForm(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault()
        const formData = new FormData(formRef.current);
        const payload = Object.fromEntries(formData)
        setSessionAndBreakLen(payload.session_len, payload.break_len);
        getCustomeThemes(payload.color1, payload.color2);
    }

    return (
        <>
        <Offcanvas show={showSettings} onHide={handleCloseSettings} placement={'start'}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Settings</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

                <Form className='SettingsChoices' onSubmit={submitForm} ref={formRef}>
                    <Row>
                        <Col xs={7}>
                            <Form.Group className='mb-3'>
                                <Form.Label>Set session/break length:</Form.Label>                        
                                <InputGroup size="sm" className="mb-3">
                                    <InputGroup.Text id="inputGroup-sizing-sm">Session</InputGroup.Text>
                                    <Form.Control
                                    placeholder="minutes"
                                    aria-label="Session's length"
                                    name="session_len"
                                    type='number'
                                    min='0' max='180'
                                    />
                                </InputGroup>

                                <InputGroup size="sm" className="mb-3">
                                    <InputGroup.Text id="inputGroup-sizing-sm">Break</InputGroup.Text>
                                    <Form.Control
                                    placeholder="minutes"
                                    aria-label="Break's length"
                                    name="break_len"
                                    type='number'
                                    min='0' max='180'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                            <Form.Label htmlFor="exampleColorInput">Pick theme color1</Form.Label>
                                <Form.Control
                                    type="color"
                                    id="exampleColorInput"
                                    defaultValue="#ffb4a2"
                                    title="Choose your color"
                                    name="color1"
                                />
                            <Form.Label htmlFor="exampleColorInput">Pick theme color2</Form.Label>
                                <Form.Control
                                    type="color"
                                    id="exampleColorInput"
                                    defaultValue="#be8993"
                                    title="Choose your color"
                                    name="color2"
                                />                            
                        </Form.Group>
                        </Col>
                    </Row>
                    
                    
                    
                    <Button variant="dark" size="sm" type="submit">Submit</Button>
                </Form>
            </Offcanvas.Body>
            </Offcanvas>
        </>
    );

      
}

 