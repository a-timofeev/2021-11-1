const divField = document.getElementById("field");

let field = [];

const fragment = document.createDocumentFragment();

for (let j = 0; j < 30; j++){
    field.push([]);
    row = document.createElement('div');
    for (let i = 0; i < 30; i++)
    {
        button = document.createElement('input');
        button.type = 'button';
        button.style.background = 'white';
        field[j].push(button);
        button.addEventListener('click', ()=>draw(i, j));
        row.append(button);
    }
    fragment.appendChild(row)
}

divField.appendChild(fragment);

colors = ['red', 'green', 'yellow', 'purple', 'blue'];
curColor = 0;

function draw(x, y) {
    for (let i = 0; i < 30; i++) {
        field[y][i].style.background = colors[curColor];
    }

    for (let i = 0; i < 30; i++) {
        field[i][x].style.background = colors[curColor];
    }
    curColor = (curColor + 1) % colors.length;
}

