const button = document.getElementById("button_sum");
const inputA = document.getElementById("input_a");
const inputB = document.getElementById("input_b");
const output = document.getElementById("output_sum");

button.addEventListener('click', () => {
    console.log("Something");
    if (!isNaN(inputA.value) && !isNaN(inputB.value)) {
        output.value = Number(inputA.value) + Number(inputB.value);
    } else {
        output.value = "Oops...";
    }


})