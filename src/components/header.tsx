
import { useRef } from "react";
import { Button, Overlay, Tooltip } from "react-bootstrap";

interface TodoPomodoroHeaderProps{
    handleShowSettings,
    buttonColor:string,
    toggleHelpTips: boolean,
    setToggleHelpTips(state:boolean):void
}

export function TodoPomodoroHeader(props:TodoPomodoroHeaderProps){
    
  const { handleShowSettings, buttonColor, setToggleHelpTips, toggleHelpTips} = props;
  const menuRef = useRef(null)
  return (

        <nav className="navbar navbar-expand-lg bg-body-tertiary TodoPomodoroHeader">
            <div className="container-fluid">
                <a className="navbar-brand" href="\"><h4 style={{color:buttonColor==='light'? 'white':'black'}}>Todo Pomodoro</h4></a>
                <div className="header-button">
                    {/* <Button variant='none' onClick={handleShowSettings} className="me-2 session-settings">≡</Button> */}
                    <button onClick={()=> setToggleHelpTips(!toggleHelpTips)}
                     style={{color:buttonColor==='light'? 'white':'black'}} className="me-2 help ">?</button>
                    <button ref={menuRef} onClick={handleShowSettings} style={{color:buttonColor==='light'? 'white':'black'}} className="me-2 session-settings">≡</button>
                    <Overlay target={menuRef.current} show={toggleHelpTips} placement='bottom'>
                        {(props) => (
                            <Tooltip {...props}>
                                Menu 
                                <br/>
                                and settings
                            </Tooltip>
                        )} 
                    </Overlay>
                
                </div>

            </div>
            
        </nav>
    )


}