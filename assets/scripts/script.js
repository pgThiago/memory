const FRONT = "card-front";
const BACK = "card-back";
const CARD = "card";
const ICON = "icon";
const FLIP = "flip";

startGame()
function startGame(){
    initializeCards(game.createCardsFromTechs());
}

function initializeCards(){
    let gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    game.cards.forEach((card) => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard(){
    if (game.setCard(this.id)){
        this.classList.add(FLIP);
        
        if(game.secondCard){
            if(game.checkMatch()){
                game.clearCards();
                if(game.checkGameOver()){
                    let gameOverLayer = document.getElementById('game-over');
                    gameOverLayer.style.display = 'flex';
                }
            }
            else{
                let firsCardView = document.getElementById(game.firstCard.id);
                let secondCardView = document.getElementById(game.secondCard.id);
    
                setTimeout(() => {
                    firsCardView.classList.remove(FLIP);
                    secondCardView.classList.remove(FLIP);
                    game.unflipCards();
                }, 1000);
            }
        }
    }
}

function createCardContent(card, cardElement){
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element){
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if(face === FRONT){
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = `./assets/images/${card.icon}.png`;
        cardElementFace.appendChild(iconElement);
    }
    else
        cardElementFace.innerHTML = '&lt/&gt';
    
    element.appendChild(cardElementFace);
}

// function restart(){
//     window.reload();
// }

function restart(){
    game.clearCards();
    let gameOverLayer = document.getElementById('game-over');
    gameOverLayer.style.display = 'none';   
    startGame();
}