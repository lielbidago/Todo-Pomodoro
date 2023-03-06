
// import {Offcanvas} from 'react-bootstrap';
// import {Button} from 'react-bootstrap';

import React, { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';


export function EditTimer({showEditTimer, handleCloseEditTimer}){
    
    return (
        <>
        <Offcanvas show={showEditTimer} onHide={handleCloseEditTimer} placement={'bottom'}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                Some text as placeholder. In real life you can have the elements you
                have chosen. Like, text, images, lists, etc.
            </Offcanvas.Body>
            </Offcanvas>
        </>
    );

      
}