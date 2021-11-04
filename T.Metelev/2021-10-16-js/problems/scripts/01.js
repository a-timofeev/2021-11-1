let inputa = document.getElementById('ainp');
let inputb = document.getElementById('binp')
let res = document.getElementById('res');

var sum = 0;

function run_pressed() {
  let a = parseInt(inputa.value);
  let b = parseInt(inputb.value);
  if (isNaN(a) || isNaN(b)) {
    res.innerHTML = "Erorr!";
    return;
  }
  sum = a + b;
  res.innerHTML = sum;
}