let cardBox = document.querySelectorAll('.pic-box');
let newGameBtn = document.querySelector('#new-game-btn');
let giveUpBtn = document.querySelector('#give-up-btn');
let cards = document.querySelectorAll('.card'); 
let movesCount = document.querySelector('#input');
let openCards = [];
let matchedCardsNumber = 0;

const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('.modal__close-btn');
const modalNewGameBtn = document.querySelector('.modal__new-game-btn');
const overlay = document.querySelector('#overlay');
const modalMovesAmount = document.querySelector('.moves-count');

// простой рандомайзер
// function cardRandomiser(arr) {
//     for(let i = 0; i < arr.length; i++) {
//         arr[i].style.order = '';
//         arr[i].style.order = Math.floor(Math.random() * arr.length + 1);
//     }
// }

// рандомайзер без повторов
function cardRandomiser(arr) {
    const cardOrders = [...Array(arr.length).keys()];
    for (let i = 0; i < arr.length; i++) {
        const randNumber = Math.floor(Math.random() * (arr.length - 1));
        [cardOrders[randNumber], cardOrders[randNumber + 1]] = [cardOrders[randNumber + 1], cardOrders[randNumber]];
    }

    for (let i = 0; i < arr.length; i++) {
        arr[i].style.order = cardOrders[i];
    }
}

function openCard(e) {
    e.target.classList.add('open');

    openCards.push(e.target.dataset.picName);
    disableOpeningCards(e.target);

    if (openCards.length > 1) {
        cards.forEach(card => disableOpeningCards(card));
    }

    if (openCards.length === 2) {
        if (areMatchingCards()) {
            markCardsMatched(document.querySelectorAll(`[data-pic-name='${openCards[1]}']`));
            endTurn();
            matchedCardsNumber++;
            if (matchedCardsNumber === (cardBox.length / 2)) {
                displayWinMessage();
            }
        } else {
            closeCards(document.querySelectorAll('.open'));
            endTurn();
        }
    }
}

function areMatchingCards() {
    return openCards[0] === openCards[1];
}

function markCardsMatched(matchedCards) {
    setTimeout(function () {
        matchedCards.forEach(card => card.classList.add('matched'));
    }, 1000);
}

function closeCards(openCards) {
    setTimeout(function () {
        openCards.forEach(card => card.classList.remove('open'));
    }, 1000);
}

function displayWinMessage() {
    console.log('you win!');
    setTimeout(() => openModal(), 1500);
    modalMovesAmount.textContent = `сделано ходов: ${movesCount.value}`;
}

function endTurn() {
    enableOpeningCards();
    movesCount.value++;
    resetOpenCards();
}

function disableOpeningCards(card) {
    card.removeEventListener('click', openCard);
}

function enableOpeningCards() {
    setTimeout(function () {
        cards.forEach(card => card.addEventListener('click', openCard));
    }, 1200);
}

function resetOpenCards() {
    openCards.splice(0);
}

function newGameFn() {
    cards.forEach(allCards => allCards.classList.remove('open'));
    setTimeout( function() {
        cards.forEach(allCards => allCards.classList.remove('matched'));
    },500); 
    setTimeout(() => cardRandomiser(cardBox), 500);
    cards.forEach(card => card.addEventListener('click', openCard));
    movesCount.value = '0';
    matchedCardsNumber = 0;
}

function giveUpFn() {
    cards.forEach(allCards => allCards.classList.add('open'));
    cards.forEach(card => disableOpeningCards(card));
}

function openModal() {
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

function newGameModal() {
    closeModal();
    newGameFn();
}

overlay.addEventListener('click', closeModal);

modalCloseBtn.addEventListener('click', closeModal);
modalNewGameBtn.addEventListener('click', newGameModal);

newGameBtn.addEventListener('click', newGameFn);

giveUpBtn.addEventListener('click', giveUpFn);

window.onload = function() {
    cardRandomiser(cardBox);
}

cards.forEach(card => card.addEventListener('click', openCard));
