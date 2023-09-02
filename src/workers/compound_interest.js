import compound_interest from "../calculators/compound-interest.js";

addEventListener("message", (event) => {
  postMessage(compound_interest(event.data));
});
