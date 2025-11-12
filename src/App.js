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
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${wordSubmit}`);
      const data = await response.json();
   
      if (!data.meals) {
          alert("No meals found");
          return;
        }

        const detailedRecipes = await Promise.all(
          data.meals.map(async (meal) => {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
            const detailData = await res.json();
            return detailData.meals[0]; 
          })
        );
    
      setMyRecipes(detailedRecipes);

        }
        getRecipe();
  }, [wordSubmit])


  const myRecipeSearch = (e) => {
      setMySearch(e.target.value);
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
