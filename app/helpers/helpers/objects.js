export const removeEmptyKeys = (obj) => {
  Object.entries(obj).forEach(
    ([key, val]) =>
      (val && typeof val === "object" && removeEmptyKeys(val)) ||
      ((val === null || val === "" || val === undefined) && delete obj[key])
  );
  return obj;
};

export const getCalories = (item) => {
  switch (item) {
    case "Bread ":
      return 200;
    case "Burger":
      return 700;
    case "Cake":
      return 280;
    case "Eggs":
      return 85;
    case "Fish":
      return 218;
    case "Noodles":
      return 260;
    case "Oisters":
      return 150;
    case "Pizza":
      return 740;
    case "Rice":
      return 190;
    case "Rottie":
      return 190;
    case "Soup":
      return 150;
    default:
      return 600;
  }
};

export function isEmpty(string) {
  return string === null || string === "" || string === undefined;
}

export function isNotEmpty(string) {
  return !isEmpty(string);
}
