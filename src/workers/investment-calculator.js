import sip from "../calculators/sip";

addEventListener("message", (event) => {
  postMessage(sip(event.data));
});
