const cards = {
    1: "Cards/1card.png",
    2: "Cards/2card.png",
    3: "Cards/3card.png",
    4: "Cards/4card.png",
    5: "Cards/5card.png",
    6: "Cards/6card.png",
    7: "Cards/7card.png",
    8: "Cards/8card.png",
    9: "Cards/9card.png",
    10: "Cards/10card.png",
    11: "Cards/11card.png",
    12: "Cards/12card.png",
    13: "Cards/13card.png",
};
const x = document.getElementsByClassName("output");
const pValue = document.getElementsByClassName("poutput");
const aiHandVal = document.getElementById("aival");

function getAiCards(id){
    const start = document.getElementById("start");
    start.addEventListener("click", function(){
        switchImage(id);
        this.disabled = true;
    })
}

function switchImage(id) {
    for (let i = 0; i < id.length; i++){
        id[i].src = getRandValue();
    }
}

function getRandValue() {
    const values = Object.values(cards); // returns values of obj keys
    const randIndex = Math.floor(Math.random() * values.length);
    return values[randIndex]; // returns img file path
}

function hit(){
    const hit = document.getElementById("hit");
    const img = document.getElementsByClassName("createimg");
    hit.addEventListener("click", function(){
        for (let i = 0; i < img.length; i++){
            const newImg = document.createElement("img");
            newImg.src = getRandValue();
            img[i].appendChild(newImg);
            newImg.width = "150";
            newImg.height = "150";
            newImg.className = "poutput";
        }
    })
}

function getValue(id, msg){
    let count = 0;
    for (const key in id){
        count += Number(key);
    }
    msg.innerHTML = `Hand's Value: ${count}`;
}


let aiHand = getAiCards(x);

let pHand = getAiCards(pValue);
pHand += hit();
getValue(aiHand, aiHandVal);