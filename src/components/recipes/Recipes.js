import React from 'react'
import './recipes.css';
import { Link } from 'react-router-dom';


const Recipes = ({ recipeList }) => (
    <div className="container">
        <div className="row">

            {   recipeList  &&
                recipeList.map(recipe => (
                    <div className="col-md-4" key={recipe.idMeal}>
                    <div className="recipe" >
                        <div className="recipe-display">
                        <img className="recipe-image img-fluid" src={recipe.strMealThumb}  alt={recipe.idMeal}/>
                        <Link to={{ pathname: `/recipe/${recipe.idMeal}`,
                            state: {recipe: recipe.strMeal}
                        }}>
                            <h4 className="recipe-title ">{recipe.strMeal.toUpperCase()}</h4>
                        </Link>
                        </div>
                        
                    </div>
                    </div>
                )) 
                
            } 

        </div>
    </div>
)

export default Recipes
