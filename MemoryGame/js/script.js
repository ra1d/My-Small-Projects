let cardBox = document.querySelectorAll('.pic-box');
let newGameBtn = document.querySelector('#new-game-btn');
let giveUpBtn = document.querySelector('#give-up-btn');
let cards = document.querySelectorAll('.card'); 
let input = document.querySelector('#input');
let cardArr = [];
let numberArray = [];
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
        numberArray.splice(0);
        do {
            let ranNum;
            ranNum = Math.floor(Math.random() * arr.length + 1);
            if(!numberArray.includes(ranNum)) {
                numberArray.push(ranNum);
        }
    } while (numberArray.length < Number(arr.length));

    for(let i = 0; i < arr.length; i++) {
        arr[i].style.order = '';
        arr[i].style.order = numberArray[i];
    }
}

function openCard(e) {
    e.target.classList.add('open');

    if(cardArr.length < 2) {
        cardArr.push(e.target.dataset.picName);
        e.target.removeEventListener('click', openCard);

        if(cardArr.length > 1) {
            cards.forEach(card => card.removeEventListener('click', openCard));
        }

        if((cardArr[0] == cardArr[1]) && (cardArr.length == 2)){
            let matchedCardArr = document.querySelectorAll(`[data-pic-name='${cardArr[1]}']`);

            setTimeout(function() {
                matchedCardArr.forEach(matchCards => matchCards.classList.add('matched'));
            }, 1000);

            setTimeout(function() {
                cards.forEach(card => card.addEventListener('click', openCard));
            }, 1200);
            

            moveCount(input);
            cardArr.splice(0);

            addMatchedCardsNumber();
            if(matchedCardsNumber === (cardBox.length / 2)) {
                console.log('you win!');
                setTimeout(() => openModal(), 1500);
                modalMovesAmount.textContent = `сделано ходов: ${input.value}`;
            }
        } else if((cardArr[0] != cardArr[1]) && (cardArr.length == 2)){
            let firstArrCards = document.querySelectorAll(`[data-pic-name='${cardArr[0]}']`);
            let secondArrCards = document.querySelectorAll(`[data-pic-name='${cardArr[1]}']`);

            setTimeout(function() {
                firstArrCards.forEach(matchCards => matchCards.classList.remove('open'));
            }, 1000);
            setTimeout(function() {
                secondArrCards.forEach(matchCards => matchCards.classList.remove('open'));
            }, 1000);


            setTimeout(function() {
                cards.forEach(card => card.addEventListener('click', openCard));
            }, 1200);


            moveCount(input);
            cardArr.splice(0);
        }
    }
}

function newGameFn() {
    cards.forEach(allCards => allCards.classList.remove('open'));
    setTimeout( function() {
        cards.forEach(allCards => allCards.classList.remove('matched'));
    },500); 
    setTimeout(() => cardRandomiser(cardBox), 500);
    cards.forEach(card => card.addEventListener('click', openCard));
    input.value = '0';
    matchedCardsNumber = 0;
}

function giveUpFn() {
    cards.forEach(allCards => allCards.classList.add('open'));
    cards.forEach(card => card.removeEventListener('click', openCard));
}

function moveCount(inpValue) {
    let x = inpValue.value;
    x = Number(x) + 1;
    inpValue.value = x;
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

function addMatchedCardsNumber() {
    matchedCardsNumber += 1;
    console.log(matchedCardsNumber);
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
