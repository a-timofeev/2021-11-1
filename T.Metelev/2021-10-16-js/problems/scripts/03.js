let inputa = document.getElementById('ainp');
let inputb = document.getElementById('binp')
let res = document.getElementById('res');

var sum = 0;

function run_pressed() {
  let a = parseInt(inputa.value);
  let b = parseInt(inputb.value);
  if (a == b) {
    res.innerHTML = "They are the same";
  } else if (a < b) {
  	res.innerHTML = "Second number is more than first one";
  } else {
  	res.innerHTML = "First number is more than second one";
  }
}