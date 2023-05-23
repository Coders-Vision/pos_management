export function playBeep(src:string){
    const sound = new Audio();
    sound.src = src;
    sound.play();
    // sound.onended=()=> sound.src=''
}