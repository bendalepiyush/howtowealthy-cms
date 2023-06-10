import emi from '../calculators/emi.js'

addEventListener("message", (event) => {
  postMessage(emi(event.data));
});