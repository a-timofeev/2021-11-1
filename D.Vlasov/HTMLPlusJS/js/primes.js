const divField = document.getElementById("field");
const button = document.getElementById("button");

button.addEventListener('click', ()=>{eruat()});

let field = [];

const fragment = document.createDocumentFragment();
console.log("hi");

const W = 20;
const H = 10;

for (let j = 0; j < H; j++){
    row = document.createElement('tr');
    for (let i = 0; i < W; i++)
    {
        cell = document.createElement('td');
        cell.style.background = 'white';
        cell.innerText = j * W + i + 1;
        field.push(cell);
        row.append(cell);
    }
    fragment.appendChild(row)
}

divField.appendChild(fragment);

function delayedDraw(arr, ind) {
    for (; ind < W * H; ind++)
        if (arr[ind] === 0) {
            field[ind].style.background = 'green';
            break;
        }
    if (ind < W * H)
        setTimeout(()=>{delayedDraw(arr, ind + 1)}, 200);
}


function eruat(x, y) {
    arr = [];
    for (let j = 0; j < H * W; j++) {
        arr.push(0);
    }

    for (let i = 1; i < W * H; i++) {
        if (arr[i] === 0) {
            for (let j = i + 1; j < W * H; j+=1)
                if ((j + 1) % (i + 1) === 0) {
                    arr[j] = 1;
                }
        }
    }
    delayedDraw(arr, 0);


}

