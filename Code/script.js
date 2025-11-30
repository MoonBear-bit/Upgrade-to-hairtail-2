let background = document.getElementById("World");
let talkBoxUI = document.getElementById("TalkBox");
let talkBoxServiceUI = document.getElementById("TalkBoxService");
let wormUI = document.getElementById("Worm");
let spanUI = document.getElementById("Span");
let LobbyButtonSetUI = document.getElementById("LobbyButtonSet");
let languageSelectUI = document.getElementById("language");
let settingBoxUI = document.getElementById("SettingBox");
let settingEndButtonUI = document.getElementById("SettingEnd");
let moneyUI = document.getElementById("Money");
let treatmentKitUI = document.getElementById("TreatmentKit");
let buyHairtailButtonUI = document.getElementById("BuyHairtail")
let upgradeHairtailUI = document.getElementById("UpgradeHairtail");
let hairtailCanvasUI = document.getElementById("HairtailCanvas");
let hairtailImageUI = document.getElementById("hairtailImage");
let upgradeEndButtonUI = document.getElementById("UpgradeEnd");
let upgradeButtonUI = document.getElementById("UpgradeButton");
let sellButtonUI = document.getElementById("SellButton")
let isClassButtonElement = [...document.querySelectorAll(".button")];
let buttonSet = {
    loadGameButtonUI: {object:document.getElementById("LoadGame"), type:"Button 1", Xpos:0.5, Ypos:0.5},
    newGameButtonUI: {object:document.getElementById("NewGame"), type:"Button 1", Xpos:0.5, Ypos:0.4},
    settingButtonUI: {object:document.getElementById("Setting"), type:"Button 1", Xpos:0.5, Ypos:0.6}
}
let width = window.innerWidth;
let height = window.innerHeight;
let _buttonTemplate1 = {
    width: "0px",
    height: "0px"
}
let hairtailSet = [];
let money = 50000;
let treatmentKit = 0;
let hairtailLevel = 0;
let shopLevel = 0
let language = "English"
let languageKind = ["English", "한국어"]
let hairtailNumber = 0;
let posX = 0.2;
let posY = 0.3;
let eggPrice = 1000;
let statusHairtail = null;
const borderRadius = 10;
const levelOfSalesPrice = [0,50,100,200,400,800,1600,3200,6700,11390,19363,32917,55959,95130,
    161721,274926,467375,794538,1350715,2296217,3903568,6636067,11281314,19178234,32602997,
    55425096,94222663,160178528
];
const levelOfUpgradeProbability = [50,97,94,91,88,85,82,79,76,73,70,67,64,61,58,55,52,49,46,43,40,37,34,31,28,25,22,0];
class Position{
    constructor(x, y){
        this.x_ = x;
        this.y_ = y;
    }
    get x(){
        return `${this.x_}px`;}
    set x(value){
        this.x_ = value;}
    get y(){
        return `${this.y_}px`;}
    set y(value){
        this.y_ = value;}
}
class Transform{
    constructor(x, y){
        this.position = new Position(x, y);
    }
}
class Hairtail{
    constructor(posXData, posYData, hairtailLevelData, priceData = 150){
        this.transform = new Transform(posXData, posYData);
        this.data = {hairtailLevel:hairtailLevelData};
        this.object = document.createElement("img");
        this.object.className = "hairtail"
        this.object.id = "hairtail" + hairtailNumber
        hairtailNumber++
        this.object.style.opacity = 1
        this.object.src = `./Image/lv${this.data.hairtailLevel}.webp`;
        this.data.price = priceData
        hairtailSet.push(this);
        document.body.appendChild(this.object);
        return this
    }
    sell(){
        money += levelOfSalesPrice[this.data.hairtailLevel];
        this.Delete()
        moneyUI.style.transform = "scale(1.1)"
        setTimeout(() => {
            moneyUI.style.transform = "scale(1)"
        }, 50);
    }
    getLevel(){
        return `lv${this.data.hairtailLevel}`;
    }
    getImage(){
        return this.object.style.backgroundImage;
    }
    Update(){
        this.object.style.height = `${(width + height) / 2 * 0.07}px`
        this.object.style.width = `${(width + height) / 2 * 0.07}px`
        this.object.style.top = `${this.transform.position.y.replace("px","") - Number(this.object.style.height.replace("px", ""))}px`
        this.object.style.left = `${this.transform.position.x.replace("px","") - Number(this.object.style.width.replace("px", ""))}px`
        
    }
    Upgrade(){
        this.data.hairtailLevel += 1;
        this.object.src = `./Image/lv${this.data.hairtailLevel}.webp`;
        this.data.price *= 1.3
        this.object.style.boxShadow = "0px 0px 20px rgba(0, 173, 14, 1)"
        this.object.style.transform = "scale(1.1)"
        setTimeout(() => {
            this.object.style.boxShadow = "box-shadow: 0px 0px 20px rgba(0, 0, 0, 1)"
            this.object.style.transform = "scale(1)"
        }, 50);
    }
    Reset(){
        this.data.hairtailLevel = 0;
        this.object.src = `./Image/lv${this.data.hairtailLevel}.webp`;
        this.data.price = 150
        this.object.style.boxShadow = "0px 0px 20px rgba(219, 0, 0, 1)"
        this.object.style.transform = "scale(1.1)"
        setTimeout(() => {
            this.object.style.boxShadow = "box-shadow: 0px 0px 20px rgba(0, 0, 0, 1)"
            this.object.style.transform = "scale(1)"
        }, 50);
    }
    Delete(){
        hairtailSet.splice(this, 1);
        this.object.remove();
        statusHairtail = null;
    }
}
settingBoxUI.style.display = "none"
background.style.width = `${width}px`;
background.style.height = `${height}px`;
background.style.backgroundSize = `${width}px ${height}px`;
background.style.opacity = 0.1;
buttonSet.loadGameButtonUI.object.style.display = (localStorage.getItem("isLoad")) ? "block" : "none"
talkBoxUI.style.display = "none";
document.body.style.margin = "0px";
document.body.style.overflow = "hidden";
document.body.style.padding = "0px";
buttonSet.newGameButtonUI.object.onclick = () => {
    localStorage.setItem("isLoad", true);
    localStorage.setItem("hairtailSet", JSON.stringify([]));
    localStorage.setItem("money", 10000);
    localStorage.setItem("treatmentKit", 0);
    StartGame();
    startTutorial();
}
buttonSet.loadGameButtonUI.object.onclick = () => {
    posX = 0.2;
    posY = 0.3;
    if (localStorage.getItem("isLoad")){
        let NewSet = JSON.parse(localStorage.getItem("hairtailSet"));
        for (object of NewSet){
            let hairtailObject = new Hairtail(width * posX, height * posY, object[0], object[1]);
            hairtailObject.object.addEventListener("click", () => {
            if (!statusHairtail){
                statusHairtail = hairtailObject;
            }
        });
        posX += 0.07;
        if (posX + 0.07 > 1){
            posY += 0.12
            posX = 0.2
        }
        }
        money = localStorage.getItem("money");
        treatmentKit = localStorage.getItem("treatmentKit");
        StartGame();
    }
}
buttonSet.settingButtonUI.object.onclick = () => {
    settingBoxUI.style.display = "block";
}
settingEndButtonUI.onclick = () => {
    settingBoxUI.style.display = "none";
}
buyHairtailButtonUI.onclick = () => {
    if (hairtailSet.length < 55 && money > eggPrice){
        money -= eggPrice;
        eggPrice += Math.floor(Math.random() * 20) - 10
        let hairtailObject = new Hairtail(width * posX, height * posY, 0);
        hairtailObject.object.addEventListener("click", () => {
            if (!statusHairtail){
                statusHairtail = hairtailObject;
            }
        });
        moneyUI.style.transform = "scale(1.1)"
        setTimeout(() => {
            moneyUI.style.transform = "scale(1)"
        }, 50);
        posX += 0.07;
        if (posX + 0.07 > 1){
            posY += 0.12
            posX = 0.2
        }
    }
}
upgradeEndButtonUI.onclick = () => {
    statusHairtail = null;
}
upgradeButtonUI.onclick = () => {
    if (money >= statusHairtail.data.price){
        moneyUI.style.transform = "scale(1.1)"
        setTimeout(() => {
            moneyUI.style.transform = "scale(1)"
        }, 50);
        money -= statusHairtail.data.price;
        let Random = Math.random() * 100
        if (Random <= levelOfUpgradeProbability[statusHairtail.data.hairtailLevel]){
            hairtailImageUI.style.boxShadow = "0px 0px 20px rgba(15, 182, 0, 1)"
            hairtailImageUI.style.transform = "scale(1.1)"
            setTimeout(() => {
                hairtailImageUI.style.boxShadow = "box-shadow: 0px 0px 20px rgba(0, 0, 0, 1)"
                hairtailImageUI.style.transform = "scale(1)"
            }, 50);
            statusHairtail.Upgrade()
        }else{
            if (treatmentKit >= statusHairtail.data.hairtailLevel){
                treatmentKit -= statusHairtail.data.hairtailLevel;
            }else{
                hairtailImageUI.style.boxShadow = "0px 0px 20px rgba(224, 0, 0, 1)"
                hairtailImageUI.style.transform = "scale(1.1)"
                setTimeout(() => {
                    hairtailImageUI.style.boxShadow = "box-shadow: 0px 0px 20px rgba(0, 0, 0, 1)"
                    hairtailImageUI.style.transform = "scale(1)"
                }, 50);
                statusHairtail.Reset()
            }
        }
    }
}
sellButtonUI.onclick = () => {
    statusHairtail.sell()
}
function InGameLoop(){
    for (let value of hairtailSet)
        value.Update();
    let newList = []
    for (object of hairtailSet){
        newList.push([object.data.hairtailLevel, object.data.price])
    }
    localStorage.setItem("hairtailSet", JSON.stringify(newList));
    localStorage.setItem("money", money);
    localStorage.setItem("treatmentKit", treatmentKit);
    requestAnimationFrame(InGameLoop);
}
/*
window.addEventListener("resize", () => {
    UpdateUI();
});
*/
function Loop(){
    requestAnimationFrame(Loop);
}
function startTutorial(){
    switch (language){
        case "English":
            talk(["Hello, hello. I'm Twistworm.", "From now on, you will raise hairtail.", "You will adopt and raise more hairtail than you've ever seen in your life.",
                "You can adopt a hairtail by clicking the 'Purchase Hairtail' button for a certain amount of money.","Be careful. hairtail can become more expensive or cheaper the more you buy.",
                "Once you've purchased a hairtail, you can strengthen it.","After strengthening it and reaching a certain level, you can sell it for money.",
                "When you gamble, your money will go through a random roulette between x0 and x2.","Sometimes special cutlassfish appear, so collect them.","Good luck, Friend!"
            ]);
            break;
        case "한국어":
            talk(["이봐요, 안녕하세요. 저는 지렁이입니다.", "이제부터 당신은 갈치를 강화해야 합니다.", "당신이 지금까지 살면서 보았던 모든 갈치들이 바로 여기 있습니다.",
                "당신은 '갈치 입양' 버튼을 눌러 값을 지불하고 갈치를 들여올 수 있습니다.","그러나 주의해야 합니다. 갈치의 값은 구매할 때마다 비싸질 수도 있고, 그대로일 수도 있으며, 저렴해 질 수도 있습니다.",
                "갈치를 구매하는 그 순간부터, 갈치를 강화할 수 있습니다.","갈치를 강화 하다가 높은 단계에 도달해 순수 이익이 생기게 된다면 팔아도 좋습니다. 돈을 늘리는 것은 당신의 갈치 강화에 도움을 줄 겁니다..",
                "또한 당신이 도박을 한다면, 당신의 돈은 2배에서 0배 사이의 랜덤한 숫자로 변할 겁니다.","가끔 특별한 갈치가 등장할 수도 있습니다. 그 갈치를 모으세요! 우리의 목표는 박물관을 차리는 것입니다.","행운을 빕니다! 갈치를 잘 강화하기를 바랍니다."
            ]);
            break;
    }
}
function talk(list){
    let index = 0;
    talk_index(index, list);
}
function talk_index(index, list){
    if (list[index]){
        talkBoxServiceUI.style.display = "block";
        talkBoxUI.style.display = "block"
        spanUI.innerHTML = list[index]
        let ifkeep = true;
        talkBoxUI.addEventListener("click", () => {
                ifkeep = false;
                talkBoxUI.style.display = "none"
                talk_index(index + 1, list);
        });
    }else{
        talkBoxServiceUI.style.display = "none";
    }
}
function UpdateUI(){
    width = window.innerWidth;
    height = window.innerHeight;
    _buttonTemplate1.width = width / 10;
    _buttonTemplate1.height = height / 12;
    language = languageSelectUI.value;
    background.style.width = `${width}px`;
    background.style.height = `${height}px`;
    background.style.backgroundSize = `${width}px ${height}px`;
    for (let key in buttonSet){
        switch (buttonSet[key].type){
            case "Button 1":
                let object = buttonSet[key].object;
                object.style.width = `${_buttonTemplate1.width}px`;
                object.style.height = `${_buttonTemplate1.height}px`;
                object.style.fontSize = `${Number(object.style.width.replace("px", "")) / object.textContent.length}px`;
                break;
        }
        let object = buttonSet[key].object;
        object.style.left = `${(width * buttonSet[key].Xpos) - (Number(buttonSet[key].object.style.width.replace("px", "")) / 2)}px`;
        object.style.top = `${(height * buttonSet[key].Ypos) - (Number(buttonSet[key].object.style.height.replace("px", "")) / 2)}px`;
    }
    talkBoxUI.style.width = `${width * 0.9}px`;
    talkBoxUI.style.height = `${height * 0.15}px`;
    spanUI.style.fontSize = `${Number(talkBoxUI.style.width.replace("px", "")) / spanUI.textContent.length+10}px`;
    talkBoxUI.style.left = `${width * 0.05}px`;
    talkBoxUI.style.top = `${height * 0.75}px`;
    wormUI.style.width = `${width * 0.15}px`;
    wormUI.style.height = `${height * 0.25}px`;
    wormUI.style.left = `${0}px`;
    wormUI.style.top = `${-Number(wormUI.style.height.replace("px", ""))}px`;
    languageSelectUI.style.left = `${width * 0.025}px`;
    languageSelectUI.style.top = `${height * 0.01}px`;
    languageSelectUI.style.width = `${width * 0.15}px`;
    languageSelectUI.style.height = `${height * 0.06}px`;
    languageSelectUI.style.fontSize = `${height * 0.04}px`;
    settingBoxUI.style.left = `${width * 0.4}px`;
    settingBoxUI.style.top = `${height * 0.35}px`;
    settingBoxUI.style.width = `${width * 0.2}px`;
    settingBoxUI.style.height = `${height * 0.3}px`;
    settingEndButtonUI.style.left = `${0}px`;
    settingEndButtonUI.style.top = `${height * 0.25}px`;
    settingEndButtonUI.style.width = `${width * 0.2}px`;
    settingEndButtonUI.style.height = `${height * 0.05}px`;
    settingEndButtonUI.style.fontSize = `${height * 0.04}px`;
    moneyUI.innerHTML = `$${Math.floor(money)}`;
    moneyUI.style.fontSize = `${height * 0.05}px`;
    moneyUI.style.left = `${0}px`;
    moneyUI.style.top = `${0}px`;
    moneyUI.style.width = `${width}px`;
    treatmentKitUI.style.fontSize = `${height * 0.04}px`;
    treatmentKitUI.style.left = `${0}px`;
    treatmentKitUI.style.top = `${height * 0.05}px`;
    treatmentKitUI.style.width = `${width}px`;
    buyHairtailButtonUI.style.height = `${height * 0.07}px`;
    buyHairtailButtonUI.style.width = `${width * 0.17}px`;
    buyHairtailButtonUI.style.fontSize = `${Number(buyHairtailButtonUI.style.width.replace("px", "")) / buyHairtailButtonUI.textContent.length + 10}px`;
    buyHairtailButtonUI.style.left = `${0}px`;
    buyHairtailButtonUI.style.top = `${height * 0.1}px`;
    upgradeHairtailUI.style.left = `${width * 0.4}px`;
    upgradeHairtailUI.style.top = `${height * 0.35}px`;
    upgradeHairtailUI.style.width = `${width * 0.2}px`;
    upgradeHairtailUI.style.height = `${height * 0.3}px`;
    upgradeEndButtonUI.style.left = `${0}px`;
    upgradeEndButtonUI.style.top = `${height * 0.25}px`;
    upgradeEndButtonUI.style.width = `${width * 0.2}px`;
    upgradeEndButtonUI.style.height = `${height * 0.05}px`;
    upgradeEndButtonUI.style.fontSize = `${height * 0.04}px`;
    hairtailCanvasUI.style.left = `${width * 0.065}px`;
    hairtailCanvasUI.style.top = `${height * 0.015}px`;
    hairtailCanvasUI.style.width = `${width * 0.07}px`;
    hairtailCanvasUI.style.height = `${width * 0.07}px`;
    hairtailImageUI.style.left = `${0}px`;
    hairtailImageUI.style.top = `${0}px`;
    hairtailImageUI.style.width = `${width * 0.07}px`;
    hairtailImageUI.style.height = `${width * 0.07}px`;
    talkBoxServiceUI.style.width = `${width}px`;
    talkBoxServiceUI.style.height = `${height}px`;    
    upgradeButtonUI.style.top = `${height * 0.03 + width * 0.07}px`
    sellButtonUI.style.top = `${height * 0.03 + width * 0.07}px`
    upgradeButtonUI.style.left = `${width * 0.05}px`
    sellButtonUI.style.left = `${width * 0.1}px`
    upgradeButtonUI.style.height = `${height * 0.05}px`
    sellButtonUI.style.height = `${height * 0.05}px`
    upgradeButtonUI.style.width = `${width * 0.05}px`
    sellButtonUI.style.width = `${width * 0.05}px`
    upgradeButtonUI.style.fontSize = `${height * 0.02}px`
    sellButtonUI.style.fontSize = `${height * 0.02}px`
    switch (language){
        case "한국어":
            buttonSet.newGameButtonUI.object.textContent = "새 게임";
            buttonSet.loadGameButtonUI.object.textContent = "게임 계속하기";
            buttonSet.settingButtonUI.object.textContent = "환경 설정";
            treatmentKitUI.innerHTML = `치료 키트: ${treatmentKit}개`;
            buyHairtailButtonUI.innerHTML = `갈치 입양($${eggPrice})`
            settingEndButtonUI.innerHTML = `종료`
            upgradeEndButtonUI.innerHTML = `종료`
            upgradeButtonUI.innerHTML = `강화`
            sellButtonUI.innerHTML = `판매`
            break;
        case "English":
            buttonSet.newGameButtonUI.object.textContent = "New Game";
            buttonSet.loadGameButtonUI.object.textContent = "Load Game";
            buttonSet.settingButtonUI.object.textContent = "Setting";
            treatmentKitUI.innerHTML = `Treatment Kit: ${treatmentKit}`;
            buyHairtailButtonUI.innerHTML = `buy Hairtail($${eggPrice})`
            settingEndButtonUI.innerHTML = `End`
            upgradeEndButtonUI.innerHTML = `End`
            upgradeButtonUI.innerHTML = `Upgrade`
            sellButtonUI.innerHTML = `Sell`
    }
    if (statusHairtail){
        upgradeHairtailUI.style.display = "block"
        hairtailImageUI.src = statusHairtail.object.src
    }
    else{
        upgradeHairtailUI.style.display = "none"
    }
    for (let elements of isClassButtonElement){
        elements.style.borderRadius = `${elements.style.width.replace("px", "") / borderRadius}px`;
    }
}
function StartGame(){
    UpdateUI();
    background.style.opacity = 0.5;
    LobbyButtonSetUI.style.display = "none";
    moneyUI.style.display = "block";
    treatmentKitUI.style.display = "block";
    buyHairtailButtonUI.style.display = "block"
    InGameLoop();
}
UpdateUI()
Loop();

