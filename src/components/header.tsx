
import { Button } from "react-bootstrap";

interface TodoPomodoroHeaderProps{
    changeStatusTodosEdit(status:boolean):void
    handleShowSettings
}

export function TodoPomodoroHeader(props:TodoPomodoroHeaderProps){
    
  const {changeStatusTodosEdit, handleShowSettings} = props;

  function onOpen(event: React.MouseEvent<HTMLElement>){  
    changeStatusTodosEdit(true)
  }
  
  return (
        // <h1 className="TodoPomodoroHeader">Todo Pomodoro</h1>

        <nav className="navbar navbar-expand-lg bg-body-tertiary TodoPomodoroHeader">
            <div className="container-fluid">
                <a className="navbar-brand" href="\"><h4>Todo Pomodoro</h4></a>
                <div className="header-button">
                    {/* <button type="button" className="btn btn-outline-light editTODOS" onClick={onOpen}>edit</button> */}
                    <Button variant="outline-light" onClick={handleShowSettings} className="me-2 session-settings">settings</Button>
                </div>

            </div>
            
        </nav>
    )

    

    // return (
    //     <nav className="navbar navbar-expand-lg bg-body-tertiary TodoPomodoroHeader">
    //     <div className="container-fluid">
    //       <a className="navbar-brand" href="#">Todo Pomodoro</a>
    //       <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
    //       data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" 
    //       aria-label="Toggle navigation">
    //         <span className="navbar-toggler-icon"></span>
    //       </button>
    //       <button type="button" className="editTODOS" onClick={()=>{changeStatusTodosEdit(true)}}>edit</button>

    //       <div className="collapse navbar-collapse" id="navbarNavDropdown">
    //         <ul className="navbar-nav">
    //           <li className="nav-item dropdown">
    //             <a className="nav-link dropdown-toggle" href="#" role="button" 
    //             data-bs-toggle="dropdown" aria-expanded="false">
    //               Menu
    //             </a>
    //             <ul className="dropdown-menu">
    //               <li><a className="dropdown-item" href="#">Action</a></li>
    //               <li><a className="dropdown-item" href="#">Another action</a></li>
    //               <li><a className="dropdown-item" href="#">Something else here</a></li>
    //             </ul>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>
    // );
}