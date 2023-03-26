

export function CompletionForcast({CompletionForcastEval}){
    
    return (
        <div className="CompletionForcast">
            <label htmlFor="CompletionForcast-title">At this rate, you'll finish your todos in:</label>
            <h4>{CompletionForcastEval()}</h4>
            sessions
        </div>
    );
}