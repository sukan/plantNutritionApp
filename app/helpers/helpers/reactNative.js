export const BTManager = () => {
  return Math.floor(Math.random() * (80 - 70 + 1) + 70);
};

export function textTruncate(str = "", length = 100, ending = "...") {
  if (str === null || str === undefined) {
    return "";
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
}
