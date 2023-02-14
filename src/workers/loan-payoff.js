import loanPayOff from "../calculators/loan-payoff";

addEventListener("message", (event) => {
  postMessage(loanPayOff(event.data));
});
