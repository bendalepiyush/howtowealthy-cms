import cagr from "../calculators/cagr-calc.js";

addEventListener("message", (event) => {
  postMessage(cagr(event.data));
});
