const searchMeal = async (e) => {
  e.preventDefault();

  const input = document.querySelector('.input');
  const title = document.querySelector('.title');
  const info = document.querySelector('.info');
  const img = document.querySelector('.img');
  const ingredientsOutput = document.querySelector('.ingredients');

  const showAlert = (message) => {
    alert(message);
  };

  const showMealInfo = (meal) => {
    const { strMeal, strMealThumb, strInstructions } = meal;
    title.textContent = strMeal;
    img.style.backgroundImage = `url(${strMealThumb})`;
    info.textContent = strInstructions;

    let ingredients = [];

    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
      } else {
        break;
      }
    }

    const html = ingredients.map(ing => `<li class="ing">${ing}</li>`).join('');
    ingredientsOutput.innerHTML = html;
  };

  const fetchMealData = async (val) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`);
      const data = await response.json();
      return data.meals;
    } catch (error) {
      console.error("Fetch error:", error);
      showAlert("An error occurred while fetching meals.");
      return null;
    }
  };

  const val = input.value.trim();
  if (val) {
    const meals = await fetchMealData(val);
    if (!meals) {
      showAlert("No meals found. Please try another search term.");
      return;
    }
    meals.forEach(showMealInfo);
  } else {
    showAlert("Please try searching for a meal :)");
  }
};

document.querySelector('form').addEventListener('submit', searchMeal);