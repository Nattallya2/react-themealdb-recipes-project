
import { useEffect, useState } from 'react';
import './App.css';
import video from './food.mp4';
import icon from './icons-cooking-book.png';
import MyRecipesComponents from './MyRecipesComponents';

function App() {

  const [mySearch, setMySearch] = useState("");
  const [myrecipes, setMyRecipes] = useState([]);
  const [wordSubmit, setWordSubmit] = useState("beef");


  useEffect(() => {
    const getRecipe = async () => {
      //Fetch basic meal info by ingredient
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${wordSubmit}`);
      const data = await response.json();
      // console.log(data.meals);
      // console.log(data.meals[0].strMeal);
      // console.log(data.meals[0].idMeal);

//    data that we get  {
//   "meals": [
//     {
//       "strMeal": "Beef and Mustard Pie",
//       "strMealThumb": "https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg",
//       "idMeal": "52874"
//     },
//     {
//       "strMeal": "Beef Brisket Pot Roast",
//       "strMealThumb": "https://www.themealdb.com/images/media/meals/ursuup1487348423.jpg",
//       "idMeal": "52812"
//     }
//   ]
// }

     

      // const recipe = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data.meals[0].idMeal}`);
      // const recipeData = await recipe.json();
      // console.log(recipeData);
      // console.log(recipeData.meals);
      // console.log(recipeData.meals[0].strInstructions);
      // console.log(recipeData.meals[0].strSource);

//    recipeData that we get from the lookup   {
//   "meals": [
//     {
//       "idMeal": "52874",
//       "strMeal": "Beef and Mustard Pie",
//       "strDrinkAlternate": null,
//       "strCategory": "Beef",
//       "strArea": "British",
//       "strInstructions": "Preheat the oven...",
//       "strMealThumb": "https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg",
//       ...
//     }
//   ]
// }


      if (!data.meals) {
          alert("No meals found");
          return;
        }

      //For each meal ID, fetch full recipe info 
        const detailedRecipes = await Promise.all(
          data.meals.map(async (meal) => {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
            const detailData = await res.json();
            return detailData.meals[0]; // each call returns an array with 1 recipe
            
          })
        );
     
      //Save all full recipes to state
      setMyRecipes(detailedRecipes);
      console.log("Full recipes:", detailedRecipes);

        }
        getRecipe();
  }, [wordSubmit])


  const myRecipeSearch = (e) => {
      setMySearch(e.target.value);
      console.log(e.target.value);
  }

  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmit(mySearch);
  }

  return (
    <div className="App">

      <div className='container'>
        <video loop autoPlay muted>
          <source src={video} type="video/mp4"/>
        </video>
        <h1>Find a Recipe</h1>
      </div>

      <div className='container'>
          <form onSubmit={finalSearch}>
            <input className='search' onChange={myRecipeSearch} value={mySearch} placeholder="Type an ingredient..."/>
          </form>
      </div>

      <div className='container'>
          <button>
            <img src={icon} alt="icon" onClick={finalSearch}/>
          </button>
      </div>

      {myrecipes.map(element => (
        <MyRecipesComponents 
        key={element.idMeal}
        title={element.strMeal} 
        image={element.strMealThumb} 
        instructions={element.strInstructions}
        area={element.strArea}
        />
      ))
      }

    </div>
  );
}

export default App;
