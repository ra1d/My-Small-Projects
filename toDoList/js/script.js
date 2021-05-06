let inputField = document.querySelector('#input');
let addBtn = document.querySelector('#addBtn');
let clearListBtn = document.querySelector('#clearList');
let ul = document.querySelector('ul');
let listBox = document.querySelector('.list-box');

function addBtnFunc() {
    let li = document.createElement('li');
    let span = document.createElement('span');
    let delBtn = document.createElement('button');
    let completeBtn = document.createElement('button');
    let imptBtn = document.createElement('button');

    let inputText = inputField.value;
    // console.log(inputText);
    inputField.value = '';
    
    if(inputText) {
        span.textContent = inputText;
        completeBtn.textContent = 'v';
        delBtn.textContent = 'x';
        imptBtn.textContent = '!';
        
        li.appendChild(span);
        li.appendChild(imptBtn);
        li.appendChild(completeBtn);
        li.appendChild(delBtn);
        ul.appendChild(li);

        delBtn.addEventListener('click', () => {
            ul.removeChild(li);
        });
        completeBtn.addEventListener('click', () => {
            span.classList.toggle('comlete');
        });
        imptBtn.addEventListener('click', () => {
            span.classList.toggle('important');
        });

        inputField.focus();
    } else {
        alert('add something');
    }
}

addBtn.addEventListener('click', addBtnFunc);
inputField.addEventListener('keyup', (e) => {
    if(e.keyCode === 13) {
        e.preventDefault();
        addBtnFunc();
    }
});

clearListBtn.addEventListener('click', () => {
    ul.innerHTML = '';
});
