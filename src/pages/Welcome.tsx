import { Link } from "react-router-dom";

export default function Welcome(){
    
    return (
        <div className="welcome-page" >
            <div className="welcomediv">
                <h4>Hello, welcome to</h4>
                <h1>PomodoTodo</h1>
                <p> 
                    Manage your tasks and increase your productivity. <br/>
                    With <strong>PomodoTodo</strong>, you can create and manage your to-do list, 
                    as well as track your progress. <br/>
                    The Pomodoro timer helps you stay focused, work in concentrated bursts and pace yourself.</p>
                     
                <Link role="button" type="button" className="start btn btn-outline-dark" to={`todos-and-pomodoro`}>START</Link>

            </div>
        </div>
    )
};
