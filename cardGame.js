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
const ai = document.getElementsByClassName("output");
const player = document.getElementsByClassName("poutput");

const aiHandVal = document.getElementById("jtext"); //output msg for ai hand amount
const pHandVal = document.getElementById("ptext"); //output msg for p hand amount

const start = document.getElementById("start"); //start btn
const hitBtn = document.getElementById("hit"); //hit btn


let pHand = [];
let aiHand = [];

function getAiCards(){
    start.addEventListener("click", function(){
        switchImage(ai, aiHand, aiHandVal);
        switchImage(player, pHand, pHandVal);
        this.disabled = true;
        hitBtn.disabled = false;
    })
}

function switchImage(elements, handArr, handArrDisplay) {
    for (let i = 0; i < elements.length; i++){
        const card = getRandValue();
        elements[i].src = card.value;
        handArr.push(getCardFaceValue(Number(card.key)));
    }
    getValue(handArrDisplay, handArr);
}

function getRandValue() {
    const values = Object.values(cards); // returns values of obj keys
    const keys = Object.keys(cards); //returns keys of values
    const randIndex = Math.floor(Math.random() * values.length);
    const output = {
        key: keys[randIndex],
        value: values[randIndex],
    };
    return output;
}

function hit(){
    hitBtn.disabled = true;
    const img = document.getElementsByClassName("createimg");
    hitBtn.addEventListener("click", function(){
        for (let i = 0; i < img.length; i++){
            const newImg = document.createElement("img");
            const card = getRandValue();
            newImg.src = card.value;
            img[i].appendChild(newImg);
            newImg.width = "150";
            newImg.height = "150";
            newImg.className = "poutput";
            pHand.push(getCardFaceValue(Number(card.key)));
            getValue(pHandVal, pHand);
        }
    })
}

function getValue(msg, handArr){
    const total = handArr.reduce((acc, curr) => acc + curr, 0);
    msg.innerHTML = `Hand's Value: ${total}`;
}

function getCardFaceValue(cardNum){
    if (cardNum >= 11) return 10;
    return cardNum;
}




hit();
getAiCards();
