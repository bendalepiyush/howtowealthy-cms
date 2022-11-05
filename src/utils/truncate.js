const truncate = (input, length) =>
  input.length > 5 ? `${input.substring(0, length)}...` : input;

export default truncate;
