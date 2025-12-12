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
let buyTreatmentKitButtonUI = document.getElementById("BuyTreatmentKit")
let gamblingButtonUI = document.getElementById("Gambling")
let upgradeHairtailUI = document.getElementById("UpgradeHairtail");
let hairtailCanvasUI = document.getElementById("HairtailCanvas");
let hairtailImageUI = document.getElementById("hairtailImage");
let upgradeEndButtonUI = document.getElementById("UpgradeEnd");
let upgradeButtonUI = document.getElementById("UpgradeButton");
let sellButtonUI = document.getElementById("SellButton")
let missionButtonUI = document.getElementById("MissionButton");
let missionUI = document.getElementById("MissionCanvas");
let mouseFollowUI = document.getElementById("MouseFollower")
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
let museumSet = [];
let hairtailSet = [];
let MissionsSet = [];
let money = 50000;
let treatmentKit = 0;
let hairtailLevel = 0;
let shopLevel = 0
let language = "English"
let languageKind = ["English", "한국어"]
let hairtailNumber = 0;
let missionNumber = 0;
let posX = 0.2;
let posY = 0.3;
let eggPrice = 1000;
let statusHairtail = null;
let X = 0;
let Y = 0;
let missionList = [
    {
        name: {korean: "단단한 갈치", english: "Solid hairtail"},
        value: {korean: "lv12 텅스텐 갈치에 도달하시오", english: "Reach lv12 tungsten hairtail"},
        resultValue: "$7500",
        successCondition: function(){
            for (let object of hairtailSet){
                if (object.data.hairtailLevel == 12){
                    return true;
                }
            }
            return false;
        },
        isSuccess: false,
        result: function(){
            money += 7500
        }
    }
]
const borderRadius = 10;
const levelOfSalesPrice = [0,50,100,200,400,800,1600,3200,6700,11390,19363,32917,55959,95130,
    161721,274926,467375,794538,1350715,2296217,3903568,6636067,11281314,19178234,32602997,
    55425096,94222663,160178528,272303497
];
const levelOfUpgradeProbability = [50,97,94,91,88,85,82,79,76,73,70,67,64,61,58,55,52,49,46,43,40,37,34,31,28,25,22,17,0];
const hairtailName = [{english:"egg",korean:"알"},{english:"baby hairtail",korean:"새끼 갈치"},{english:"young hairtail",korean:"어린 갈치"}
    ,{english:"hairtail",korean:"갈치"},{english:"rock hairtail",korean:"돌 갈치"},{english:"steel hairtail",korean:"철 갈치"},{english:"silver hairtail",korean:"은 갈치"}
    ,{english:"gold hairtail",korean:"금 갈치"},{english:"sapphire hairtail",korean:"사파이어 갈치"},{english:"ruby hairtail",korean:"루비 갈치"},{english:"titanium hairtail",korean:"티타늄 갈치"}
    ,{english:"diamond hairtail",korean:"다이아몬드 갈치"},{english:"tungsten hairtail",korean:"텅스텐 갈치"},{english:"uranium hairtail",korean:"우라늄 갈치"}
    ,{english:"super hairtail",korean:"초월적인 갈치"},{english:"crazy hairtail",korean:"미친 갈치"},{english:"old hairtail",korean:"노인 갈치"}
    ,{english:"rich hairtail",korean:"금품갈치"},{english:"semiconductor hairtail",korean:"반도체 갈치"},{english:"slice hairtail",korean:"자른 갈치"}
    ,{english:"frozen hairtail",korean:"냉동 갈치"},{english:"grilled hairtail",korean:"구운 갈치"},{english:"zombie hairtail",korean:"좀비 갈치"}
    ,{english:"rifle hairtail",korean:"총 갈치"},{english:"sniper hairtail",korean:"저격수 갈치"},{english:"space hairtail",korean:"우주 갈치"}
    ,{english:"planet hairtail",korean:"행성 갈치"},{english:"earth hairtail",korean:"지구 갈치"},{english:"???",korean:"???"}
]
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
    constructor(posXData, posYData, hairtailLevelData, priceData){
        this.transform = new Transform(posXData, posYData);
        this.data = {hairtailLevel:hairtailLevelData};
        this.object = document.createElement("img");
        this.object.className = "hairtail"
        this.object.id = "hairtail" + hairtailNumber
        hairtailNumber++
        this.object.style.opacity = 1
        this.object.style.left = this.transform.position.x
        this.object.style.top = this.transform.position.y
        this.object.src = `./Image/lv${this.data.hairtailLevel}.webp`;
        this.data.price = priceData
        this.object.addEventListener("mouseenter",() => {
            this.object.style.transform = "scale(1.1)"
            mouseFollowUI.style.display = "block"
            switch(language){
                case "English":
                    mouseFollowUI.innerHTML = `lv${this.data.hairtailLevel} ${hairtailName[this.data.hairtailLevel].english}<br>
                    <small>Probability of success:</small>${levelOfUpgradeProbability[this.data.hairtailLevel]}% <br>Price:$${this.data.price} <br><small>SalesPrice:</small>${levelOfSalesPrice[this.data.hairtailLevel]}`
                    break;
                case "한국어":
                    mouseFollowUI.innerHTML = `${this.data.hairtailLevel}강 ${hairtailName[this.data.hairtailLevel].korean}<br>
                    성공확률:${levelOfUpgradeProbability[this.data.hairtailLevel]}% <br>가격:$${this.data.price} <br>판매가격:${levelOfSalesPrice[this.data.hairtailLevel]}`
            }
        })
        this.object.addEventListener("mouseleave",() => {
            mouseFollowUI.style.display = "none"
            this.object.style.transform = "scale(1)"
        })
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
        hairtailNumber = 0;
        hairtailSet.splice(hairtailSet.indexOf(this), 1);
        this.object.remove();
        statusHairtail = null;
        for(let object of hairtailSet){
            object.object.remove();
        }
        posX = 0.2
        posY = 0.3
        let NewSet = []
        for (object of hairtailSet){
            NewSet.push([object.data.hairtailLevel, object.data.price])
        }
        hairtailSet = []
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
    }
}
class Missions{
    constructor(posXData, posYData, otherData){
        this.transform = new Transform(posXData, posYData);
        this.data = otherData;
        this.object = document.createElement("div");
        this.object.className = "Missions"
        this.object.id = "Mission" + missionNumber
        missionNumber++
        this.object.style.opacity = 1
        this.object.addEventListener("mouseenter",() => {
            this.object.style.transform = "scale(1.1)"
            mouseFollowUI.style.display = "block"
            switch(language){
                case "English":
                    mouseFollowUI.innerHTML = `${this.data.name.english} - ${this.data.value.english}(${this.data.resultValue})`
                    break;
                case "한국어":
                    mouseFollowUI.innerHTML = `${this.data.name.korean} - ${this.data.value.korean}(${this.data.resultValue})`
            }
        })
        this.object.addEventListener("mouseleave",() => {
            mouseFollowUI.style.display = "none"
            this.object.style.transform = "scale(1)"
        })
        this.object.addEventListener("click", () => {
            if (this.data.successCondition()){
                this.success()
            }
        })
        MissionsSet.push(this);
        document.body.appendChild(this.object);
        return this
    }
    success(){
        this.object.style.backgroundColor = "darkgray"
        this.data.result()
        this.data.isSuccess = true;
    }
    Update(){
        this.object.style.height = `${(width + height) / 2 * 0.1}px`
        this.object.style.width = `${(width + height) / 2 * 0.1}px`
        this.object.style.top = `${this.transform.position.y.replace("px","") - Number(this.object.style.height.replace("px", ""))}px`
        this.object.style.left = `${this.transform.position.x.replace("px","") - Number(this.object.style.width.replace("px", ""))}px`
        if (this.data.successCondition()){
            this.object.style.boxShadow = "0px 0px 25px rgba(0, 173, 14, 1)"
        }else{
            this.object.style.boxShadow = "none"
        }
        
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
    let newMissionList = localStorage.getItem("missionList")
    for (let object of missionList){
        object.isSuccess = newMissionList[missionList.indexOf(object)]
    }
    if (localStorage.getItem("isLoad")){
        museumSet = JSON.parse(localStorage.getItem("museumSet"))
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
        money = Number(localStorage.getItem("money"));
        treatmentKit = Number(localStorage.getItem("treatmentKit"));
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
        let hairtailObject = new Hairtail(width * posX, height * posY, 0, 150);
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
buyTreatmentKitButtonUI.onclick = () => {
    if (money >= 5000){
        money -= 5000
        treatmentKit += 1
        moneyUI.style.transform = "scale(1.1)"
        treatmentKitUI.style.transform = "scale(1.1)"
        setTimeout(() => {
            moneyUI.style.transform = "scale(1)"
            treatmentKitUI.style.transform = "scale(1)"
        }, 50);
    }
}
gamblingButtonUI.onclick = () => {
    money = Math.round(money * Math.random() * 2)
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
                treatmentKitUI.style.transform = "scale(1.1)"
                hairtailImageUI.style.boxShadow = "0px 0px 20px rgba(255, 187, 0, 1)"
                hairtailImageUI.style.transform = "scale(1.1)"
                setTimeout(() => {
                    treatmentKitUI.style.transform = "scale(1)"
                    hairtailImageUI.style.boxShadow = "box-shadow: 0px 0px 20px rgba(0, 0, 0, 1)"
                    hairtailImageUI.style.transform = "scale(1)"
                }, 50);
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
missionButtonUI.onclick = () => {
    if (missionUI.style.display == "none"){
        missionUI.style.display = "block"
    }else[
        missionUI.style.display = "none"
    ]
}
hairtailCanvasUI.addEventListener("mouseenter",() => {
    mouseFollowUI.style.display = "block"
    switch(language){
        case "English":
            mouseFollowUI.innerHTML = `lv${statusHairtail.data.hairtailLevel} ${hairtailName[statusHairtail.data.hairtailLevel].english}<br>
            <small>Probability of success:</small>${levelOfUpgradeProbability[statusHairtail.data.hairtailLevel]}% <br>Price:$${statusHairtail.data.price} <br><small>SalesPrice:</small>${levelOfSalesPrice[statusHairtail.data.hairtailLevel]}`
            break;
        case "한국어":
            mouseFollowUI.innerHTML = `${statusHairtail.data.hairtailLevel}강 ${hairtailName[statusHairtail.data.hairtailLevel].korean}<br>
            성공확률:${levelOfUpgradeProbability[statusHairtail.data.hairtailLevel]}% <br>가격:$${statusHairtail.data.price} <br>판매가격:${levelOfSalesPrice[statusHairtail.data.hairtailLevel]}`
    }
})
hairtailCanvasUI.addEventListener("mouseleave",() => {
    mouseFollowUI.style.display = "none"
})
document.addEventListener("mousemove", (event) => {
    X = event.pageX
    Y = event.pageY
})
function InGameLoop(){
    mouseFollowUI.style.fontSize = `${height * 0.025}px`
    mouseFollowUI.style.height = `${height * 0.16}px`
    mouseFollowUI.style.width = `${width * 0.2}px`
    mouseFollowUI.style.top = `${Y + 10}px`
    mouseFollowUI.style.left = `${X + 10}px`
    moneyUI.innerHTML = `$${Math.floor(money)}`;
    for (let value of hairtailSet)
        value.Update();
    let newMissionList = []
    for (object of missionList){
        newMissionList.push(object.isSuccess)
    }
    let newList = []
    for (object of hairtailSet){
        newList.push([object.data.hairtailLevel, object.data.price])
    }
    localStorage.setItem("museumSet", JSON.stringify(museumSet));
    localStorage.setItem("missionList", JSON.stringify(newMissionList))
    localStorage.setItem("hairtailSet", JSON.stringify(newList));
    localStorage.setItem("money", money);
    localStorage.setItem("treatmentKit", treatmentKit);
    requestAnimationFrame(InGameLoop);
}
function Loop(){
    switch (language){
        case "한국어":
            buttonSet.newGameButtonUI.object.textContent = "새 게임";
            buttonSet.loadGameButtonUI.object.textContent = "게임 계속하기";
            buttonSet.settingButtonUI.object.textContent = "환경 설정";
            treatmentKitUI.innerHTML = `치료 키트: ${treatmentKit}개`;
            buyHairtailButtonUI.innerHTML = `_갈치 입양($${eggPrice})_`
            buyTreatmentKitButtonUI.innerHTML = `치료키트 구매($5000)`
            buyTreatmentKitButtonUI.innerHTML = `도박하기!(2~0배)`
            settingEndButtonUI.innerHTML = `종료`
            upgradeEndButtonUI.innerHTML = `종료`
            upgradeButtonUI.innerHTML = `강화`
            sellButtonUI.innerHTML = `판매`
            missionButtonUI.innerHTML = `___업적___`
            break;
        case "English":
            buttonSet.newGameButtonUI.object.textContent = "New Game";
            buttonSet.loadGameButtonUI.object.textContent = "Load Game";
            buttonSet.settingButtonUI.object.textContent = "Setting";
            treatmentKitUI.innerHTML = `Treatment Kit: ${treatmentKit}`;
            buyHairtailButtonUI.innerHTML = `buy Hairtail($${eggPrice})`
            buyTreatmentKitButtonUI.innerHTML = `buy TreatmentKit($5000)`
            gamblingButtonUI.innerHTML = `Gambling!(x2~0)`
            settingEndButtonUI.innerHTML = `End`
            upgradeEndButtonUI.innerHTML = `End`
            upgradeButtonUI.innerHTML = `Upgrade`
            sellButtonUI.innerHTML = `Sell`
            missionButtonUI.innerHTML = `Mission`
    }
    spanUI.style.fontSize = `${Number(talkBoxUI.style.width.replace("px", "")) / spanUI.textContent.length+10}px`;
    languageSelectUI.style.fontSize = `${height * 0.04}px`;
    settingEndButtonUI.style.fontSize = `${height * 0.04}px`;
    moneyUI.style.fontSize = `${height * 0.05}px`;
    treatmentKitUI.style.fontSize = `${height * 0.04}px`;
    upgradeEndButtonUI.style.fontSize = `${height * 0.04}px`;
    upgradeButtonUI.style.fontSize = `${height * 0.02}px`
    sellButtonUI.style.fontSize = `${height * 0.02}px`
    buyHairtailButtonUI.style.fontSize = `${Number(buyHairtailButtonUI.style.width.replace("px", "")) / buyHairtailButtonUI.textContent.length + 8}px`;
    buyTreatmentKitButtonUI.style.fontSize = `${Number(buyTreatmentKitButtonUI.style.width.replace("px", "")) / buyTreatmentKitButtonUI.textContent.length + 8}px`;
    gamblingButtonUI.style.fontSize = `${Number(gamblingButtonUI.style.width.replace("px", "")) / gamblingButtonUI.textContent.length + 8}px`;
    missionButtonUI.style.fontSize = `${Number(missionButtonUI.style.width.replace("px", "")) / missionButtonUI.textContent.length + 10}px`;
    if (statusHairtail){
        upgradeHairtailUI.style.display = "block"
        hairtailImageUI.src = statusHairtail.object.src
    }
    else{
        upgradeHairtailUI.style.display = "none"
    }
    requestAnimationFrame(Loop);
}
function startTutorial(){
    switch (language){
        case "English":
            talk(["Hello, hello. I'm Twistworm.", "From now on, you will raise hairtail.", "You will adopt and raise more hairtail than you've ever seen in your life.",
                "You can adopt a hairtail by clicking the 'Purchase Hairtail' button for a certain amount of money.","Be careful. hairtail can become more expensive or cheaper the more you buy.",
                "Once you've purchased a hairtail, you can strengthen it.","After strengthening it and reaching a certain level, you can sell it for money.",
                "When you gamble, your money will go through a random roulette between x0 and x2.","Buy a Treatmentkit. As long as the kit is at the level of the hairtail, the hairtail will not die.","Sometimes special cutlassfish appear, so collect them.","Good luck, Friend!"
            ]);
            break;
        case "한국어":
            talk(["이봐요, 안녕하세요. 저는 지렁이입니다.", "이제부터 당신은 갈치를 강화해야 합니다.", "당신이 지금까지 살면서 보았던 모든 갈치들이 바로 여기 있습니다.",
                "당신은 '갈치 입양' 버튼을 눌러 값을 지불하고 갈치를 들여올 수 있습니다.","그러나 주의해야 합니다. 갈치의 값은 구매할 때마다 비싸질 수도 있고, 그대로일 수도 있으며, 저렴해 질 수도 있습니다.",
                "갈치를 구매하는 그 순간부터, 갈치를 강화할 수 있습니다.","갈치를 강화 하다가 높은 단계에 도달해 순수 이익이 생기게 된다면 팔아도 좋습니다. 돈을 늘리는 것은 당신의 갈치 강화에 도움을 줄 겁니다..",
                "또한 당신이 도박을 한다면, 당신의 돈은 2배에서 0배 사이의 랜덤한 숫자로 변할 겁니다.","치료 키트를 구매하세요. 키트가 갈치의 레벨 만큼 있다면, 갈치는 죽지 않습니다.","가끔 특별한 갈치가 등장할 수도 있습니다. 그 갈치를 모으세요! 음, 어차피 모을 수 밖에 없겠지만요.","행운을 빕니다! 갈치를 잘 강화하기를 바랍니다."
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
    settingBoxUI.style.left = `${width * 0.4}px`;
    settingBoxUI.style.top = `${height * 0.35}px`;
    settingBoxUI.style.width = `${width * 0.2}px`;
    settingBoxUI.style.height = `${height * 0.3}px`;
    settingEndButtonUI.style.left = `${0}px`;
    settingEndButtonUI.style.top = `${height * 0.25}px`;
    settingEndButtonUI.style.width = `${width * 0.2}px`;
    settingEndButtonUI.style.height = `${height * 0.05}px`;
    moneyUI.style.left = `${0}px`;
    moneyUI.style.top = `${0}px`;
    moneyUI.style.width = `${width}px`;
    treatmentKitUI.style.left = `${0}px`;
    treatmentKitUI.style.top = `${height * 0.05}px`;
    treatmentKitUI.style.width = `${width}px`;
    buyHairtailButtonUI.style.height = `${height * 0.07}px`;
    buyHairtailButtonUI.style.width = `${width * 0.14}px`;
    buyHairtailButtonUI.style.left = `${0}px`;
    buyHairtailButtonUI.style.top = `${height * 0.1}px`;
    buyTreatmentKitButtonUI.style.height = `${height * 0.07}px`;
    buyTreatmentKitButtonUI.style.width = `${width * 0.14}px`;
    buyTreatmentKitButtonUI.style.left = `${0}px`;
    buyTreatmentKitButtonUI.style.top = `${height * 0.2}px`;
    gamblingButtonUI.style.height = `${height * 0.07}px`;
    gamblingButtonUI.style.width = `${width * 0.14}px`;
    gamblingButtonUI.style.left = `${0}px`;
    gamblingButtonUI.style.top = `${height * 0.3}px`;
    upgradeHairtailUI.style.left = `${width * 0.4}px`;
    upgradeHairtailUI.style.top = `${height * 0.35}px`;
    upgradeHairtailUI.style.width = `${width * 0.2}px`;
    upgradeHairtailUI.style.height = `${height * 0.3}px`;
    upgradeEndButtonUI.style.left = `${0}px`;
    upgradeEndButtonUI.style.top = `${height * 0.25}px`;
    upgradeEndButtonUI.style.width = `${width * 0.2}px`;
    upgradeEndButtonUI.style.height = `${height * 0.05}px`;
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
    missionUI.style.top = `${0}px`;
    missionUI.style.left = `${width * 0.5}px`;
    missionUI.style.height = `${height}px`;
    missionUI.style.width = `${width * 0.5}px`;
    missionButtonUI.style.height = `${height * 0.07}px`;
    missionButtonUI.style.width = `${width * 0.14}px`;
    missionButtonUI.style.left = `${width * 0.84}px`;
    missionButtonUI.style.top = `${height * 0.9}px`;
    for (let elements of isClassButtonElement){
        elements.style.borderRadius = `${elements.style.width.replace("px", "") / borderRadius}px`;
    }
}
function StartGame(){
    background.style.opacity = 0.5;
    LobbyButtonSetUI.style.display = "none";
    moneyUI.style.display = "block";
    treatmentKitUI.style.display = "block";
    buyHairtailButtonUI.style.display = "block"
    buyTreatmentKitButtonUI.style.display = "block"
    gamblingButtonUI.style.display = "block"
    missionButtonUI.style.display = "block"
    UpdateUI();
    InGameLoop();
}
UpdateUI()
Loop();