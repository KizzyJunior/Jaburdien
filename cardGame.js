const cards = {
    2: "Cards/2card.png",
    3: "Cards/3card.png",
    4: "Cards/4card.png",
    5: "Cards/5card.png",
};

function getAiCards(){
    const start = document.getElementById("start");
    start.addEventListener("click", function(){
        switchImage();
        this.disabled = true;
    })
}

function switchImage() {
    const x = document.getElementsByClassName("output");
    for (let i = 0; i < x.length; i++){
        x[i].src = getRandValue();
    }
}

function getRandValue() {
    const values = Object.values(cards); // returns values of obj keys
    const randIndex = Math.floor(Math.random() * values.length);
    return values[randIndex]; // returns img file path
}


getAiCards();
