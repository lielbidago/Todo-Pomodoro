
import { useRef, useContext } from 'react';
import { Button, Offcanvas, Form, InputGroup, Col, Row  } from 'react-bootstrap';
import { ThemeContext } from '../context/themeContext';
import { timerReducerActions } from "../hooks/useTimer";
import { ItimerReducerAction, ItimerState } from "../hooks/useTimerTypes";



interface ISettingsProps{
    showSettings:boolean,
    handleCloseSettings():void,
    timerDispatch(action:ItimerReducerAction):void,
    timerState:ItimerState,
}

export function Settings({showSettings, timerState, handleCloseSettings, timerDispatch }:ISettingsProps){
   
   const {setCustomeThemes, themeColors} = useContext(ThemeContext);
   const formRef = useRef<HTMLFormElement>(null);
   
   function submitForm(event: React.FormEvent<HTMLFormElement>): void {
       event.preventDefault()
       const formData = new FormData(formRef.current!);
       const payload = Object.fromEntries(formData)

       if (payload.session_len !== "" && payload.session_len !== " "){
            timerDispatch({
                type:timerReducerActions.setSession,
                payload:{newSessionMinutes: Number(payload.session_len as string)}
            });
       }

       if (payload.break_len !== "" && payload.break_len !== " "){
            timerDispatch({
                type:timerReducerActions.setBreak,
                payload:{newBreakMinutes: Number(payload.break_len as string)}
            });
        }
       
       setCustomeThemes(payload.color1, payload.color2);
       
       
       if(payload.isLooped as unknown as boolean !== timerState.isLooped){
           timerDispatch({type:timerReducerActions.setLoopMode, payload:{}})
       }

       handleCloseSettings()
   }

   return (
       <>
       <Offcanvas show={showSettings} onHide={handleCloseSettings} placement={'end'} >
           <Offcanvas.Header closeButton>
               <Offcanvas.Title>Settings</Offcanvas.Title>
           </Offcanvas.Header>
           <Offcanvas.Body>

               <Form className='SettingsChoices' onSubmit={submitForm} ref={formRef}>
                   <Row>
                       <Col xs={7}>
                           <Form.Group className='mb-3'>
                               <Form.Label>Set session/break lengths (in minutes):</Form.Label>                        
                               <InputGroup size="sm" className="mb-3">
                                   <InputGroup.Text id="inputGroup-sizing-sm">Session</InputGroup.Text>
                                   <Form.Control
                                   placeholder="minutes"
                                   aria-label="Session's length"
                                   name="session_len"
                                   type='number'
                                   min='0' max='180'
                                   defaultValue={timerState.session/60}
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
                                   defaultValue={timerState.break/60}
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
                                   defaultValue={themeColors.innerColor}
                                   title="Choose your color"
                                   name="color1"
                               />
                           <Form.Label htmlFor="ColorInput2">Pick theme color2</Form.Label>
                               <Form.Control
                                   type="color"
                                   id="exampleColorInput"
                                   defaultValue={themeColors.outerColor}
                                   title="Choose your color"
                                   name="color2"
                               />                            
                       </Form.Group>
                       </Col>
                   </Row>
                   <Row>
                       <Form.Group className='mb-3'>
                           <Form.Label htmlFor="SessionLoopMode">Pick Session Mode</Form.Label>
                           <Form.Check name="isLooped" 
                                label='continuous' 
                                defaultChecked={timerState.isLooped}/>
                       </Form.Group>
                   </Row>
                   
                   
                   <Button variant="dark" size="sm" type="submit">Save</Button>
               </Form>
           </Offcanvas.Body>
           </Offcanvas>
       </>
   );

     
}

 