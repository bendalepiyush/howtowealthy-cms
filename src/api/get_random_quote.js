const quotes = [
  {
    quote:
      "Remember, no matter where you currently are, this isn't your destination. Your finances can and will improve based on your commitment and patience.",
  },
  {
    quote: "The best thing money can buy is financial freedom.",
    author: "Rob Berger",
  },
  {
    quote:
      "If it does not bring you happiness, will at least help you be miserable in comfort.",
    author: "Helen Gurley Brown",
  },
  {
    quote:
      "The key to financial freedom and great wealth is a person's ability or skill to convert earned income into Passive Income and/or Portfolio Income",
    author: "Robert Kiyosaki",
  },
  {
    quote: "Money is a terrible master but an excellent servant.",
    author: "P.T. Barnum",
  },
  {
    quote:
      "If you were born poor then it's not your fault. But if you die poor then it's your fault.",
    author: "Bill Gates",
  },
  {
    quote:
      "The stock market is designed to transfer money from the Active to the Patient.",
    author: "Warren Buffett",
  },
  {
    quote:
      "It's not your salary that makes you rich; it's your spending habits.",
    author: "Charles A. Jaffe",
  },
  {
    quote:
      "It is well enough that people of the nation do not understand our banking and monetary system, for if they did, I believe there would be a revolution before tomorrow morning.",
    author: "Henry Ford",
  },
  {
    quote:
      "Under capitalism, man exploits man. Under communism, it's just the opposite.",
    author: "John Kenneth Galbraith",
  },
  {
    quote: "Beware of little expenses. A small leak will sink a great ship.",
    author: "Benjamin Franklin",
  },
];

export default function randomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}
