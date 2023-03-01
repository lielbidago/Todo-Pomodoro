import { Link } from "react-router-dom";

export function WelcomePage(){
    return (
        <div className="welcome-page container">
            <div>
                <h2>hello, welcome to</h2>
                <h1>Todo Pomodoro!</h1>
                <p>here you can enter your tasks and create a time line for complition,
                     that you'll do using our pomodoro timer</p>
            </div>
            <Link role="button" type="button" className=" start btn" to={`/Todos-and-pomodoro`}>START</Link>

        </div>
    )
}