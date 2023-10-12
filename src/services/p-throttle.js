import pThrottle from "p-throttle";
import hygraph from "./hygraph";

const throttle = pThrottle({ limit: 5, interval: 1000 });
export const throttledFetch = throttle(async (...args) => {
  const [query, vars] = args;

  const data = await hygraph.request(query, vars);

  return data;
});
