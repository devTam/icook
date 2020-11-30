import './App.css';
import { useState, useEffect } from "react";
import Navigation from "./components/navigation/Navigation";
import Preloader from "./components/preloader/Preloader";
import Search from './components/search/Search';
import Recipes from './components/recipes/Recipes';

function App() {

  const [recipeList, setRecipeList] = useState([]);
  const [searchedTerm, setSearchedTerm] = useState('');
  const [errorMsg, setErrorMsg] = useState('')

  const getSearchedTerm = (text) => {
    setSearchedTerm(text);
  }

  useEffect( () => {
      const fetchMeal = async() => {
        try {
          
  
            const req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedTerm}`)
            const data = await req.json();
         
            if(data.meals) {
              setRecipeList(data.meals)
              setErrorMsg('')
            }else {
              setErrorMsg('Oops! Can not find that recipe. Try another.')
              setRecipeList([])
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
    let recipeFromStorage = JSON.parse(localStorage.getItem("recipeList"));
    setRecipeList(recipeFromStorage)
  }, [])

  useEffect(() => {
    const recipes = JSON.stringify(recipeList);
    localStorage.setItem("recipeList", recipes)
  }, [recipeList])

 


  return (
    <div className="App">
      <Preloader />
      <Navigation />
      <Search getSearchedTerm={getSearchedTerm} />
      <Recipes recipeList={recipeList} />
    </div>
  );
}

export default App;
