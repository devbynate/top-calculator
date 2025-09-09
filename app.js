const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

const operate = (operation, x, y) => operation(x, y);

const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let firstNumber = "";
let secondNumber = "";
let currentOperation = null;
let shouldResetDisplay = false;

function clearDisplay() {
  display.value = "";
}

function resetCalculator() {
  firstNumber = "";
  secondNumber = "";
  currentOperation = null;
  shouldResetDisplay = false;
  clearDisplay();
}

function appendNumber(number) {
  if (display.value === "0" || shouldResetDisplay) {
    clearDisplay();
    shouldResetDisplay = false;
  }
  display.value += number;
}

function setOperation(operator) {
  if (currentOperation !== null) evaluate();
  firstNumber = display.value;
  currentOperation = operator;
  shouldResetDisplay = true;
}

function evaluate() {
  if (currentOperation === null || shouldResetDisplay) return;
  secondNumber = display.value;
  let x = parseFloat(firstNumber);
  let y = parseFloat(secondNumber);

  let result;
  switch (currentOperation) {
    case "+":
      result = operate(add, x, y);
      break;
    case "-":
      result = operate(subtract, x, y);
      break;
    case "*":
      result = operate(multiply, x, y);
      break;
    case "/":
      result = operate(divide, x, y);
      break;
    default:
      return;
  }

  display.value = result;
  firstNumber = result;
  currentOperation = null;
}

// Button events
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (!isNaN(value) || value === ".") {
      appendNumber(value);
    } else if (value === "=") {
      evaluate();
    } else if (value === "C") {
      resetCalculator();
    } else {
      setOperation(value);
    }
  });
});
