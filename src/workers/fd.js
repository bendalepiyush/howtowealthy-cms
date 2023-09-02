import fd from '../calculators/fd.js'

addEventListener("message", (event) => {
  postMessage(fd(event.data));
});