import { getCalories } from "@app/helpers/helpers/objects";

export const getFoodMeal = (item) => {
  let calories = getCalories(item);

  if (calories < 400) {
    return [
      {
        title: "Diabetics & heart disease",
        content: [
          "Whole grain oatmeal with chopped apple and low-fat yogurt or almond 15g or dark chocolate 20g.",
          "Red rice with wattakka kola malluma, garlic curry, whole dal curry, flatty fish 20g or egg or white meat 20g, orange juice or low- fat yogurt",
          "Black bean 100g (cooked) or vegetable salad (3-4 vegetables) with flatty fish 20g or vegetable salad with white meat 20g or soup with flatty fish or white meat, whole wheat bread 2 slice, green tea or orange or papaya juice.",
        ],
      },
      {
        title: "Cholesterol & heart disease",
        content: [
          "Black beans 100g(cooked) or vegetable salad (3-4 vegetables) with flatty fish or white meat 20g or soup with flatty fish or white meat 20g and whole wheat bread 2 slice.",
          "Whole grain oatmeal with chopped apple, low-fat yogurt or avocado juice or local pomegranates 50g.",
          "Red rice with carrot curry, garlic curry, whole dal curry, flatty fish or meat 20g or egg and low-fat yogurt or fruits 50g.",
        ],
      },
      {
        title: "diabetics, cholesterol & heart disease",
        content: [
          "Red rice with wattakka kola malluma, garlic curry, whole dal curry or beans 20g(cooked), flatty fish or white meat 15g.",
          "Whole grain oatmeal with chopped apple and almonds 15g or low-fat yogurt or local pomegranates 50g.",
          "Vegetable salad (3-4 vegetables) with flatty fish or white meat20g or soup with flatty fish or white meat 20g or black beans with flatty fish or meat 10g.",
        ],
      },
      {
        title: "only heart disease",
        content: [
          "Red rice with karapincha kola malluma(curry tree), whole dal curry, garlic curry, flatty fish or white meat 20g.",
          "Vegetable salad (3-4 vegetables) with flatty fish or white meat 25g or soup with flatty fish or white meat 25g or black beans with milk or flatty fish or meat 15g.",
          "Whole grain oatmeal with chopped apple and beans 15g(cooked), local pomegranates 50g or green tea or orange juice.",
        ],
      },
    ];
  } else if (calories >= 400 && calories < 450) {
    return [
      {
        title: "Diabetics & heart disease",
        content: [
          "Whole grain oatmeal with chopped apple and low-fat yogurt or almond 5-8g or dark chocolate 8-12g.",
          "Red rice with wattakka kola malluma, garlic curry, whole dal curry, flatty fish 10-15g or egg or white meat 10-15g, orange juice or low- fat yogurt",
          "Black bean 80g (cooked) or vegetable salad (3-4 vegetables) with flatty fish 10-15g or vegetable salad with white meat 8-15g or soup with flatty fish or white meat, whole wheat bread 2 slice, green tea or orange or papaya juice.",
        ],
      },
      {
        title: "Cholesterol & heart disease",
        content: [
          "Black beans 80g(cooked) or vegetable salad (3-4 vegetables) with flatty fish or white meat 10-15g or soup with flatty fish or white meat 10-15g and whole wheat bread 2 slice.",
          "Whole grain oatmeal with chopped apple, low-fat yogurt or avocado juice or local pomegranates 25-35g.",
          "Red rice with carrot curry, garlic curry, whole dal curry, flatty fish or meat 15-20g or egg and low-fat yogurt or fruits 35-50g.",
        ],
      },
      {
        title: "Diabetics, cholesterol & heart disease",
        content: [
          "Red rice with wattakka kola malluma, garlic curry, whole dal curry or beans 10-15g(cooked), flatty fish or white meat 10-15g",
          "Whole grain oatmeal with chopped apple and almonds 8-15g or low-fat yogurt or local pomegranates 25-40g",
          "Vegetable salad with flatty fish or white meat10-15g or soup with flatty fish or white meat 10-20g or black beans with flatty fish or meat 10-15g",
        ],
      },
      {
        title: "Only heart disease",
        content: [
          "Red rice with karapincha kola malluma(curry tree) or wattakka kola malluma, whole dal curry, garlic curry, flatty fish or white meat 20g",
          "Vegetable salad (3-4 vegetables) with flatty fish or white meat 10-15sg or soup with flatty fish or white meat 15-20g or black beans with milk or flatty fish or meat 10-15g",
          "Whole grain oatmeal with chopped apple and beans 10-15g(cooked), local pomegranates 50g or green tea or orange juice",
        ],
      },
    ];
  } else {
    return [
      {
        title: "Diabetics & heart disease",
        content: [
          "Whole grain oatmeal with chopped apple and low-fat yogurt or almond 5-10g or dark chocolate 5g",
          "Red rice with wattakka kola malluma, garlic curry, whole dal curry or murunga sambola, flatty fish 10-15g or egg or white meat 8-15g, orange juice or low- fat yogurt",
          "Black bean 70g (cooked) or vegetable salad (3-4 vegetables) with flatty fish 10-15g or vegetable salad with white meat 8-15g or soup with flatty fish or white meat, whole wheat bread 1 slice, green tea or orange or papaya juice",
        ],
      },
      {
        title: "Cholesterol & heart disease",
        content: [
          "Black beans 70g(cooked) or vegetable salad (3-4 vegetables) with flatty fish 10-15g or soup with flatty fish10-15g and whole wheat bread 1 slice",
          "Whole grain oatmeal with chopped apple, low-fat yogurt or avocado juice or local pomegranates 35g",
          "Red rice with carrot curry, garlic curry, whole dal curry, flatty fish10-15g or egg and low-fat yogurt or fruits 30-40g",
        ],
      },
      {
        title: "Diabetics, cholesterol & heart disease",
        content: [
          "Red rice with wattakka kola malluma, garlic curry or karapincha kola malluma(curry tree), whole dal curry or beans 10-15g(cooked), flatty fish 10-15g",
          "Whole grain oatmeal with chopped apple and almonds 8-15g or low-fat yogurt or local pomegranates 30g",
          "Vegetable salad (3-4 vegetables) with flatty fish or white meat10-15g or soup with flatty fish or white meat 10-15g or black beans with flatty fish or meat 10g",
        ],
      },
      {
        title: "Only heart disease",
        content: [
          "Red rice with karapincha kola malluma(curry tree) or carrot curry, whole dal curry, garlic curry, flatty fish or white meat 10-15g",
          "Vegetable salad (3-4 vegetables) with flatty fish or white meat 10-15g or soup with flatty fish or white meat 10-15g or black beans with milk or flatty fish or meat 10g",
          "Whole grain oatmeal with chopped apple and beans 10g(cooked), local pomegranates 30g or green tea or orange juice",
        ],
      },
    ];
  }
};
