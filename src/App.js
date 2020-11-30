import './App.css';
import { useState, useEffect } from "react";
import Preloader from "./components/preloader/Preloader";
import Search from './components/search/Search';
import Recipes from './components/recipes/Recipes';

function App() {

  const [recipeList, setRecipeList] = useState([]);
  const [searchedTerm, setSearchedTerm] = useState('');
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false);

  const getSearchedTerm = (text) => {
    // Get searched term from search component and store in state
    setSearchedTerm(text);
  }

  useEffect( () => {
      const fetchMeal = async() => {
        try {
          
          setLoading(true)
            const req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedTerm}`)
            const data = await req.json();
         
            if(data.meals) {
              setRecipeList(data.meals)
              setErrorMsg('')
              setLoading(false)
            }else {
              setErrorMsg('Oops! Can not find that recipe. Try another.')
              setRecipeList([])
              setLoading(false);
            }
    
        } catch(error) {
          console.log(error.message);
        }
      }
      if(searchedTerm) {
        fetchMeal()
      }
  }, [searchedTerm])

  useEffect(() => {
    // Get item from local storage on page load
    let recipeFromStorage = JSON.parse(localStorage.getItem("recipeList"));
    setRecipeList(recipeFromStorage)
  }, [])

  useEffect(() => {
    // Store result in local storage for persistence
    const recipes = JSON.stringify(recipeList);
    localStorage.setItem("recipeList", recipes)
  }, [recipeList])

 


  return (
    <div className="App">
      <Preloader />
      <Search getSearchedTerm={getSearchedTerm} />
      <Recipes recipeList={recipeList} errorMsg={errorMsg} loading={loading} />
    </div>
  );
}

export default App;
