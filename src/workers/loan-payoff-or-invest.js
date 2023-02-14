import loanPayOfforInvest from "../calculators/loan-payoff-or-invest";

addEventListener("message", (event) => {
  postMessage(loanPayOfforInvest(event.data));
});
