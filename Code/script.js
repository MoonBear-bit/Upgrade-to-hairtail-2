let background = document.getElementById("World");
let buttonSet = {
    loadGameButtonUI: [document.getElementById("LoadGame"), "1", 0.5, 0.5],
    newGameButtonUI: [document.getElementById("NewGame"), "1", 0.5, 0.4],
    settingButtonUI: [document.getElementById("Setting"), "1", 0.5, 0.6]
}
let width = window.innerWidth;
let height = window.innerHeight;
let _buttonTemplate1 = {
    width: "0px",
    height: "0px",
}
background.style.width = `${width}px`;
background.style.height = `${height}px`;
background.style.backgroundSize = `${width}px ${height}px`;
background.style.opacity = 0.1;
function Loop(){
    width = window.innerWidth;
    height = window.innerHeight;
    _buttonTemplate1.width = width / 10;
    _buttonTemplate1.height = height / 12;
    UpdateUI()
    requestAnimationFrame(Loop);
}
function UpdateUI(){
    background.style.width = `${width}px`;
    background.style.height = `${height}px`;
    background.style.backgroundSize = `${width}px ${height}px`;
    for (let key in buttonSet){
        switch (buttonSet[key][1]){
            case "1":
                let object = buttonSet[key][0];
                object.style.width = `${_buttonTemplate1.width}px`;
                object.style.height = `${_buttonTemplate1.height}px`;
                object.style.fontSize = `${Number(object.style.width.replace("px", "")) / object.textContent.length}px`;
                break;
        }
        let object = buttonSet[key][0];
        object.style.left = `${(width * buttonSet[key][2]) - (Number(buttonSet[key][0].style.width.replace("px", "")) / 2)}px`;
        object.style.top = `${(height * buttonSet[key][3]) - (Number(buttonSet[key][0].style.height.replace("px", "")) / 2)}px`;
    }
}
Loop();