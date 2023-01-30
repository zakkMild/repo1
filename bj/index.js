const startBtn = document.getElementById("start-btn");
const drawBtn = document.getElementById("draw-btn");
const cardsEl = document.getElementById("cards");
const sumEl = document.getElementById("sum");
const message = document.getElementById("message-el");
let cards = [];
let sum = 0;
let playing = false;
let blackjack = false;

function startGame(){
    cards = [];
    sum = 0;
    renderGame();
    playing = true;
    blackjack = false;
}
function drawCard(){
    if (playing === true && blackjack === false) {
        let card = getRandomCard();
        sum += card;
        cards.push(card);
        renderGame();
}}
function renderGame(){
    cardsEl.textContent = "Cards: ";
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";
    }
    sumEl.textContent = "Sum: " + sum;
    if (sum <= 20) {
        message.textContent = "Would you like to draw?";
    }else if (sum === 21) {
        message.textContent = "You have a blackjack!";
        blackjack = true;
        playing = false;

    }else{
        message.textContent = "Game over, bitch.";
        playing = false;
    }
}







function getRandomCard() {
    let cardValue = Math.floor(Math.random() * 13) + 1;
    if (cardValue === 1) {
        return 11
    }else if (cardValue > 10) {
        return 10
    }else{return cardValue}

}


