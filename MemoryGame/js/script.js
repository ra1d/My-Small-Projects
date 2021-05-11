let cardBox = document.querySelectorAll('.pic-box');
let newGameBtn = document.querySelector('#new-game-btn');

// function cardRandomiser(arr) {
//     for(let i = 0; i < arr.length; i++) {
//         arr[i].style.order = '';
//         arr[i].style.order = Math.floor(Math.random() * arr.length + 1);
//     }
// }


let numberArray = [];

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
// itworks
// function openCard(e) {
        // e.target.classList.add('open');
        //проверить
    // e.target.classList.add('open', 'block-cursor');
//     // console.log(e.target.dataset.picName);
//     cardArr.push(e.target.dataset.picName);
//     e.target.removeEventListener('click', openCard);
    
//     console.log(cardArr);

//     if(cardArr[0] == cardArr[1]) {
//         console.log('matched');
//     } else {
//         console.log('not matched');
//     }

// }


function openCard(e) {
    // e.target.classList.add('open', 'block-cursor');
    e.target.classList.add('open');
    // console.log(e.target.dataset.picName);
    // cardArr.push(e.target.dataset.picName);
    // e.target.removeEventListener('click', openCard);
    
    console.log(cardArr);

    if(cardArr.length < 2) {
        cardArr.push(e.target.dataset.picName);
        e.target.removeEventListener('click', openCard);
        if((cardArr[0] == cardArr[1]) && (cardArr.length == 2)){
            // e.target.classList.add('matched');

            // let matchedPic = document.querySelectorAll(`[data-pic-name='${cardArr[1]}']`);
            // document.querySelectorAll(`[data-pic-name='${cardArr[1]}']`).forEach(function(matchCards) {
            //     matchCards.classList.add('matched');
            // });

            document.querySelectorAll(`[data-pic-name='${cardArr[1]}']`).forEach(matchCards =>
                matchCards.classList.add('matched'));

            // e.target.removeEventListener('click', openCard);
            console.log('matched');
            // console.log(document.querySelectorAll(`[data-pic-name='${cardArr[1]}']`));
            // console.log(matchedPic);
            cardArr.splice(0);
        } else if((cardArr[0] != cardArr[1]) && (cardArr.length == 2)){
            console.log('not matched');
            // e.target.removeEventListener('click', openCard);

            document.querySelectorAll(`[data-pic-name='${cardArr[1]}']`).forEach(matchCards =>
                matchCards.classList.remove('open'));
            document.querySelectorAll(`[data-pic-name='${cardArr[0]}']`).forEach(matchCards =>
                    matchCards.classList.remove('open'));

            document.querySelectorAll(`[data-pic-name='${cardArr[0]}']`).forEach(anyCards =>
                anyCards.addEventListener('click', openCard));
            document.querySelectorAll(`[data-pic-name='${cardArr[1]}']`).forEach(anyCards =>
                anyCards.addEventListener('click', openCard));

            // document.querySelectorAll(`[data-pic-name='${cardArr[1]}']`).forEach(matchCards =>
            //     matchCards.classList.add('test'));
            // document.querySelectorAll(`[data-pic-name='${cardArr[0]}']`).forEach(matchCards =>
            //         matchCards.classList.add('test'));

            // e.target.classList.remove('open');
            cardArr.splice(0);
        }
        
        // e.target.removeEventListener('click', openCard);
    }

    // if(cardArr[0] == cardArr[1]) {
    //     console.log('matched');
    // } else {
    //     console.log('not matched');
    // }

}






newGameBtn.addEventListener('click', () => {
    cardRandomiser(cardBox);
})

window.onload = function() {
    cardRandomiser(cardBox);
}

cards.forEach(function(card){
    card.addEventListener('click', openCard)
});

// console.log(cards[1].dataset.picName);

// window.addEventListener('click', (e) => {
//     console.log(e.target);
// });
// window.addEventListener('click', (e) => {
//     console.log(e.target.classList.toggle('open'));
// })

// let test = document.querySelectorAll("[data-pic-name='kura']");
// let test2 = document.querySelectorAll("[data-pic-name='mouse']");
// let test3 = document.querySelectorAll("[data-pic-name='svin']");
// console.log(test);
// console.log(test2);
// console.log(test3);
// window.addEventListener('click', (e) => {
//     console.log(document.querySelector('[data-pic-name]'));
// });
// document.querySelector('[someAttr]')