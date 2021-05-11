let cardBox = document.querySelectorAll('.pic-box');
let newGameBtn = document.querySelector('#new-game-btn');
let numberArray = [];
// function cardRandomiser(arr) {
//     for(let i = 0; i < arr.length; i++) {
//         arr[i].style.order = '';
//         arr[i].style.order = Math.floor(Math.random() * arr.length + 1);
//     }
// }


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

let cardArr = [];
let cards = document.querySelectorAll('.card'); 

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
            }, 1000);
            
            cardArr.splice(0);
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
            }, 1000);

            cardArr.splice(0);
        }
    }
}



newGameBtn.addEventListener('click', () => {
    cardRandomiser(cardBox);
})

window.onload = function() {
    cardRandomiser(cardBox);
}

cards.forEach(card => card.addEventListener('click', openCard));
