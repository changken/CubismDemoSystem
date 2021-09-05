export const renderMotions = (datas: string[] = null) => {
    const motionEl:Element = document.querySelector("#motions");
    const motionArr = datas===null ? ['動作1', '動作2', '動作3'] : datas;

    appendChild(motionEl, motionArr);
}

export const selectMotion = (index, datas: string[] = null) => {
    const motionEl:Element = document.querySelector("#motions");
    const motionArr = datas===null ? ['動作1', '動作2', '動作3'] : datas;

    appendChild(motionEl, motionArr, (children, i) => {
        if(i === index){
            children.classList.add("selected");
        }
    });
}

const appendChild = (element: Element, datas: string[], callback:Function=null) => {
    if(element.innerHTML !== "" && element.children.length>0){
        element.innerHTML="";
    }

    datas.forEach((val, i) =>{
        const children = document.createElement("li");
        if(callback !== null){
            callback(children, i);
        }
        children.textContent = val;
        element.appendChild(children);
    })
    
}