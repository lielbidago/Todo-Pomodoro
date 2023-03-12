export function customeBackground(){
    const customeTheme1 = localStorage.getItem('theme1');
    const customeTheme2 = localStorage.getItem('theme2');
    
    return ({background: `radial-gradient(circle, ${customeTheme1} 0%, ${customeTheme2} 100%)`})
    
}