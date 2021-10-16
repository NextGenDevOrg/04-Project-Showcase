const btn = document.getElementById("btn");
const SELECTION_ROCK = "ROCK";
const SELECTION_PAPER = "PAPER";
const SELECTION_SCISSORS = "SCISSORS";
const DEFAULT_SELECTION = "PAPER";

let userIp;
let compSelection;

const userInput = () => {
  userIp = prompt(
    `Rock, Paper or Scissors? 
  You can Also choose:
  1 . for ${SELECTION_ROCK}
  2 . for ${SELECTION_PAPER}
  3 . for ${SELECTION_SCISSORS}`,
    ""
  ).toUpperCase();
  if (userIp == 1) {
    userIp = SELECTION_ROCK;
  } else if (userIp == 2) {
    userIp = SELECTION_PAPER;
  } else if (userIp == 3) {
    userIp = SELECTION_SCISSORS;
  }

  if (
    userIp !== SELECTION_ROCK &&
    userIp !== SELECTION_PAPER &&
    userIp !== SELECTION_SCISSORS
  ) {
    userIp = DEFAULT_SELECTION;
    alert(
      `You typed an invalid input, taking default input as ${DEFAULT_SELECTION}.`
    );
  }
  return userIp;
};

const computerChoice = () => {
  let cChoice = Math.random();
  compSelection =
    cChoice < 0.33
      ? SELECTION_ROCK
      : cChoice < 0.67
      ? SELECTION_PAPER
      : SELECTION_SCISSORS;

  return compSelection;
};

const gameLogic = () => {
  let pChoice = userInput();
  let cChoice = computerChoice();

  if (
    (cChoice === SELECTION_ROCK && pChoice === SELECTION_PAPER) ||
    (cChoice === SELECTION_PAPER && pChoice === SELECTION_SCISSORS) ||
    (cChoice === SELECTION_SCISSORS && pChoice === SELECTION_ROCK)
  ) {
    alert(`You picked ${pChoice}, Computer picked ${cChoice}, "You Won!!!" `);
  } else if (pChoice === cChoice) {
    alert(
      `You picked ${pChoice}, Computer also picked ${cChoice}, "It's a Draw!!!" `
    );
  } else {
    alert(`You picked ${pChoice}, Computer picked ${cChoice}, "You Lost!!!" `);
  }
};

btn.addEventListener("click", gameLogic);
