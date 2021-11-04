let inputa = document.getElementById('ainp');
let res = document.getElementById('res');

function run_pressed() {
  let n = parseInt(inputa.value);
  let result = "";
  let i = 1;
  while (i * i <= n) {
  	let buf = i * i
  	result += buf + " ";
  	i++;
  }
  res.innerHTML = result;
}