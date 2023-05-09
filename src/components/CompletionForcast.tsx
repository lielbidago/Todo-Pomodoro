import { useRef } from "react";
import { Overlay, Tooltip } from "react-bootstrap";
import { IthemeColors } from "../App";

// interface ICompletionForcast{
//     CompletionForcastEval():number|'...'
//     themeColors:IthemeColors,
//     toggleHelpTips:boolean
// }

interface ICompletionForcast{
    forcast:string,
    themeColors:IthemeColors,
    toggleHelpTips:boolean
}
export function CompletionForcast({forcast,themeColors, toggleHelpTips}:ICompletionForcast){
    
    const forcastRef = useRef(null)

    return (
        <div ref={forcastRef}>
            <div className={"CompletionForcast "+themeColors.buttonColor}>
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