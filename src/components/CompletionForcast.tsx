import { useRef } from "react";
import { Overlay, Tooltip } from "react-bootstrap";
import { buttonColortype } from "../App";
import '../scss/CompletionForcast.scss';

export interface ICompletionForcast{
    forcast:string,
    buttonColor:buttonColortype,
    toggleHelpTips:boolean
}
export function CompletionForcast({forcast,buttonColor, toggleHelpTips}:ICompletionForcast){
    
    const forcastRef = useRef(null)

    return (
        <div ref={forcastRef} data-cy='forcast'>
            <div className={"CompletionForcast "+buttonColor}>
                <label htmlFor="CompletionForcast-title">At this rate,<br/> you'll finish your todos in:</label>
                <h4>{forcast}</h4>
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