let tableBody = document.querySelector('tbody');
let nameInput = document.querySelector('#name');
let dateInput = document.querySelector('#date');
let amountInput = document.querySelector('#amount');
let addBtn = document.querySelector('#addBtn');
let sumTd = document.querySelector('#summTd');
let amountArr = [];

function addingNewItem() {
    
    let nameData = nameInput.value;
    let dateData = dateInput.value;
    let amountData = amountInput.value;

    if(nameData && dateData && amountData) {

    amountArr.push(Number(amountInput.value));

    nameInput.value = '';
    dateInput.value = '';
    amountInput.value = '';

    
    let newTr = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let delBtn = document.createElement('button');
    delBtn.textContent = 'x';
    delBtn.style.width = '100%';
    delBtn.style.color = 'red';
    delBtn.style.fontWeight = 'bold';

    td3.setAttribute('class', 'amountTd');

    function removingItemFromArray(arr) {
        for(let i = 0; i < arr.length; i++) {
            if(arr[i] === Number(td3.innerHTML)) {
                arr.splice(i, 1);
                break;
            }
            console.log(arr);
        }
    } 

    delBtn.addEventListener('click', () => tableBody.removeChild(newTr));
    delBtn.addEventListener('click', () => removingItemFromArray(amountArr));
    delBtn.addEventListener('click', () => showSum(amountArr));

    td1.innerHTML = nameData;
    td2.innerHTML = dateData;
    td3.innerHTML = amountData;
    // td3.innerHTML = amountData + ' руб';
    td4.appendChild(delBtn);

    
    newTr.append(td1, td2, td3, td4);
    tableBody.appendChild(newTr);
    
    console.log(amountArr); 

    } else {
        // alert('заполните все три поля');

        if(! nameData) {
            document.querySelector('.name').classList.add('notification');
        }
        else if(! dateData) {
            document.querySelector('.date').classList.add('notification');
        }
        else if(! amountData) {
            document.querySelector('.amount').classList.add('notification');
        }
    }
}

function showSum(array) {
    let sum = 0;
    for(let i = 0; i < array.length; i++) {
        sum += array[i]; 
    }
    sumTd.innerHTML = sum;
}


nameInput.addEventListener('click', () => {
    document.querySelector('.name').classList.remove('notification');
});
dateInput.addEventListener('click', () => {
    document.querySelector('.date').classList.remove('notification');
});
amountInput.addEventListener('click', () => {
    document.querySelector('.amount').classList.remove('notification');
});

addBtn.addEventListener('click', addingNewItem);
addBtn.addEventListener('click', () => showSum(amountArr));

