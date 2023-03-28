
export function Footer({buttonColor}){
    return (
        <footer>
            <div className="main-footer" style={{color:buttonColor==='light'? 'white':'black'}}>
            This website was made by Liel Bidago,
            check out my other projects here:&nbsp;&nbsp;  
            <a href="https://github.com/lielbidago" className="fa fa-github"></a>&nbsp;
            and contact me here: &nbsp;&nbsp;
            <a href="https://www.linkedin.com/in/liel-bidago/" className="fa fa-linkedin"/>
            </div>

        </footer>
    )
}