
import { useEffect } from 'react';
import './App.css';
import video from './food.mp4';
import icon from './icons-cooking-book.png';

function App() {

  useEffect(() => {
    const getRecipe = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=beef`);
      const data = await response.json();
      console.log(data);
      console.log(data.meals[0].strMeal);
      console.log(data.meals[0].idMeal);
     
      const recipe = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data.meals[0].idMeal}`);
      const recipeData = await recipe.json();
      console.log(recipeData);
      console.log(recipeData.meals);
      console.log(recipeData.meals[0].strInstructions);
      console.log(recipeData.meals[0].strSource);
        }
        getRecipe();
  }, [])

  return (
    <div className="App">

      <div className='container'>
        <video loop autoPlay muted>
          <source src={video} type="video/mp4"/>
        </video>
        <h1>Find a Recipe</h1>
      </div>

      <div className='container'>
          <form>
            <input/>
          </form>
      </div>

      <div className='container'>
          <button>
            <img src={icon} alt="icon"/>
          </button>
      </div>

    </div>
  );
}

export default App;
