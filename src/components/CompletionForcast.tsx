import { useRef } from "react";
import { Overlay, Tooltip } from "react-bootstrap";


export function CompletionForcast({CompletionForcastEval, buttonColor, toggleHelpTips}){
    
    const forcastRef = useRef(null)

    return (
        <div ref={forcastRef}>
            <div className={"CompletionForcast "+buttonColor}>
                <label htmlFor="CompletionForcast-title">At this rate,<br/> you'll finish your todos in:</label>
                <h4>{CompletionForcastEval()}</h4>
                sessions
            </div> 
            <Overlay target={forcastRef.current} show={toggleHelpTips} placement='top'>
                        {(props) => (
                            <Tooltip {...props}>
                                displays a completion forcast of the tasks: <br/> the number of the sessions it would take
                            </Tooltip>
                        )} 
            </Overlay>
        </div>

    );
}