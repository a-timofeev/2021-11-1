let inputa = document.getElementById('ainp');
let res = document.getElementById('res');

function run_pressed() {
  let n = parseInt(inputa.value);
  let result = 1;
  for (let i = 1; i <= n; i++) {
  	result *= i;
  }
  res.innerHTML = result;
}