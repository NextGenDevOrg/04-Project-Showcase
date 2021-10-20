const baseInput = document.getElementById("base-input");
const heightInput = document.getElementById("height-input");
const calculate = document.getElementById("calculate-btn");
const resultOutput = document.getElementById("result");
const div1 = document.querySelector("#input1");
const div2 = document.querySelector("#input2");

const p1 = document.createElement("p");
p1.textContent = "Invalid Input!";

const p2 = document.createElement("p");
p2.textContent = "Invalid Input!";

let base;
let height;
let result;
let baseVerification = true;
let heightVerification = true;

const verifyInput = () => {
  base = parseFloat(baseInput.value);
  height = parseFloat(heightInput.value);

  if (isNaN(base) && baseVerification) {
    div1.append(p1);
    baseVerification = false;
    resultOutput.textContent = `___`;
  } else if (base && !baseVerification) {
    p1.remove();
    baseVerification = true;
  }

  if (isNaN(height) && heightVerification) {
    div2.append(p2);
    heightVerification = false;
    resultOutput.textContent = `___`;
  } else if (height && !heightVerification) {
    p2.remove();
    heightVerification = true;
  }
};

const calculation = () => {
  verifyInput();
  if (!heightVerification || !baseVerification) {
    return;
  } else {
    result = 0.5 * base * height;
    resultOutput.textContent = `${result}`;
  }
};

calculate.addEventListener("click", calculation);
