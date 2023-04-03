export function customeBackground(customeTheme1:string,customeTheme2:string){
    return ({background: `radial-gradient(circle, ${customeTheme1} 0%, ${customeTheme2} 100%)`})
}

function hexToRgb(hex:string){
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
      
    return { r, g, b };
}

function CalculateLuminance(rgbcolor:{r:number,g:number,b:number}){
    return 0.2126 * rgbcolor['r'] + 0.7152 * rgbcolor['g'] + 0.0722 * rgbcolor['b']
}

export function getButtonsColor(color1:string, color2:string){

    const color1rgb = hexToRgb(color1);
    const color2rgb = hexToRgb(color2);


    if (CalculateLuminance(color1rgb)<140 || CalculateLuminance(color2rgb)<140){
      return 'light'
    }

    return 'dark'
  }