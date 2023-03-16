
import { useState, useRef, useContext } from 'react';
import { Button, Offcanvas, Form, InputGroup, Col, Row  } from 'react-bootstrap';
import {appContext} from '../context/appContext'

export function Settings({showSettings, handleCloseSettings, setSessionAndBreakLen, setSessionLoopMode}){
    
    const {getCustomeThemes} = useContext(appContext);
    const formRef = useRef(null)
    
    function submitForm(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault()
        const formData = new FormData(formRef.current);
        const payload = Object.fromEntries(formData)

        setSessionAndBreakLen(payload.session_len||='1', payload.break_len||='1');
        getCustomeThemes(payload.color1, payload.color2);
        
        if(payload.SessionLoopMode === 'Loop'){
            setSessionLoopMode(true);
        }else{
            setSessionLoopMode(false);
        }

        handleCloseSettings()
    }

    const customeTheme1 = localStorage.getItem('theme1');
    const customeTheme2 = localStorage.getItem('theme2');

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
                                <Form.Label>Set session/break lengths (minutes):</Form.Label>                        
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
                            <Form.Label htmlFor="ColorInput1">Pick theme color1</Form.Label>
                                <Form.Control
                                    type="color"
                                    id="exampleColorInput"
                                    defaultValue={customeTheme1}
                                    title="Choose your color"
                                    name="color1"
                                />
                            <Form.Label htmlFor="ColorInput2">Pick theme color2</Form.Label>
                                <Form.Control
                                    type="color"
                                    id="exampleColorInput"
                                    defaultValue={customeTheme2}
                                    title="Choose your color"
                                    name="color2"
                                />                            
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor="SessionLoopMode">Pick Session Mode</Form.Label>
                            <Form.Select size="sm" name='SessionLoopMode' defaultValue={'not Loop'}>
                                <option value='Loop'>Loop</option>
                                <option value='not Loop'>not Loop</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    
                    
                    <Button variant="dark" size="sm" type="submit">Submit</Button>
                </Form>
            </Offcanvas.Body>
            </Offcanvas>
        </>
    );

      
}

 