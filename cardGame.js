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
const ai = document.getElementsByClassName("output"); //ai hand
const player = document.getElementsByClassName("poutput"); //player hand

const aiHandVal = document.getElementById("jtext"); //output msg for ai hand amount
const pHandVal = document.getElementById("ptext"); //output msg for p hand amount

const start = document.getElementById("start"); //start btn
const hitBtn = document.getElementById("hit"); //hit btn
const standBtn = document.getElementById("stand"); //stand btn

let pHand = []; //arr to store key's for value calculation
let aiHand = []; //arr to store key's for value calculation

let aiStand = false;
let pStand = false;

//on start click generate cards and enable hit & stand
function getAiCards(){
    start.addEventListener("click", function(){
        switchImage(ai, aiHand, aiHandVal);
        switchImage(player, pHand, pHandVal);
        this.disabled = true;
        hitBtn.disabled = false;
        standBtn.disabled = false;
    })
}

//function to get random card and assign it to selected handArr
function switchImage(elements, handArr, handArrDisplay) {
    for (let i = 0; i < elements.length; i++){
        const card = getRandValue();
        elements[i].src = card.value;
        handArr.push(getCardFaceValue(Number(card.key)));
    }
    getValue(handArrDisplay, handArr);
}

//returns the keys and value of each card (value being the file path & key being the key of said value)
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

//adds random card to player hand and assigns class "poutput" to rand card generated
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
            checkForBust(pHand);
            aiChoice(pHand, aiHand);
        }
    })
}
//ai hit
function aiHit(){
    const img = document.getElementsByClassName("aicreateimg");
    for (let i = 0; i < img.length; i++){
        const newImg = document.createElement("img");
        const card = getRandValue();
        newImg.src = card.value;
        img[i].appendChild(newImg);
        newImg.width = "150";
        newImg.height = "150";
        newImg.className = "output";
        aiHand.push(getCardFaceValue(Number(card.key)));
        getValue(aiHandVal, aiHand);
        checkForBust(aiHand);
    }
}

//get total value of hand and assign total to msg
function getValue(msg, handArr){
    const total = handArr.reduce((acc, curr) => acc + curr, 0);
    if (msg){
        msg.innerHTML = `Hand's Value: ${total}`;
    }
    return total;
}

//if card is a face value card (king, jack, queen) set value to 10
function getCardFaceValue(cardNum){
    if (cardNum >= 11) return 10;
    return cardNum;
}

//does shit
function stand(){
    standBtn.disabled = true;
    standBtn.addEventListener("click", function(){
        standBtn.disabled = true;
        hitBtn.disabled = true;
        pStand = true;
        aiChoice(pHand, aiHand);
        checkWin();
    });
}


//checks if ur above 21
function checkForBust(deckArr){
    let deckValue = getValue(undefined, deckArr);
    const win = document.getElementById("winOrLose");
    if (deckValue > 21){
        win.innerHTML = "BUSTED";
    }
} 
//ai choice logic (HOLY TOOT MY BRAIN MELTING) (wtf are these comments)
function aiChoice(pDeck, aiDeck){
    let pDeckValue = getValue(undefined, pDeck);
    let aiDeckValue = getValue(undefined, aiDeck);
    //if aiHand < pHand do something
    if (aiDeckValue < 17 && !aiStand){
        //Draw Card
        aiHit();
    } else {
        aiStand = true;
        checkWin();
    }
}

function checkWin(){
    if (aiStand && pStand){
        const win = document.getElementById("win");
        let p = getValue(undefined, pHand);
        let ai = getValue(undefined, aiHand);
        let pToCompare = 21 - p;
        let aiToCompare = 21 - ai;
        if (pToCompare < aiToCompare){
            //plyr win
            win.innerHTML = "Player Won!";
        } else {
            win.innerHTML = "Jaburdien Won!";
        }
    }
}

stand();
hit();
getAiCards();
