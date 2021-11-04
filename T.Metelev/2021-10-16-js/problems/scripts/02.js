let inputa = document.getElementById('ainp');
let inputb = document.getElementById('binp')
let res = document.getElementById('res');

var sum = 0;

function run_pressed() {
  let a = inputa.value;
  let b = inputb.value;
  if (a == "" && b == "") {
    res.innerHTML = "Empty input!";
    return;
  }
  sum = a + b;
  res.innerHTML = sum;
}