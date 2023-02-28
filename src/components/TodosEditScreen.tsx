import {  useRef } from "react";


export function TodosEditScreen(){
    
    const inputRef = useRef(null);
    
    return (
        <div>
            <input ref={inputRef} placeholder={'enter task here'}></input>
            <ul className="my-todos">

            </ul>
        </div>


    )
}