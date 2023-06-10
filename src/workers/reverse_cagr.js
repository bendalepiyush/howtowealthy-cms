import reverse_cagr from "../calculators/reverse-cagr";

addEventListener("message", (event) => {
  postMessage(reverse_cagr(event.data));
});
