import React from "react";
import "./recipes.css";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import ProgressiveImage from "react-progressive-image";

const Recipes = ({ recipeList, errorMsg, loading }) => (
  <div className="container">
    {loading ? <Loader /> : ""}
    <div className="error-container">
      {errorMsg && (
        <div className="alert alert-danger my-4 text-center error">
          {errorMsg}
        </div>
      )}
    </div>
    <div className="row">
      {recipeList &&
        recipeList.map((recipe) => (
          <div className="col-md-4" key={recipe.idMeal}>
            <div className="recipe">
              <div className="recipe-display">
                <ProgressiveImage
                  src={recipe.strMealThumb}
                  placeholder={recipe.idMeal}
                >
                  {(src) => {
                    return (
                      <div>
                        <img className="progressive-image recipe-image img-fluid" src={src} alt={recipe.idMeal}/>
                        <noscript>
                          <img
                            className="progressive-image recipe-image img-fluid no-script"
                            src={src} alt={recipe.idMeal}
                          />
                        </noscript>
                      </div>
                    );
                  }}
                </ProgressiveImage>
                <Link
                  to={{
                    pathname: `/recipe/${recipe.idMeal}`,
                    state: { recipe: recipe.strMeal },
                  }}
                >
                  <h4 className="recipe-title ">
                    {recipe.strMeal.toUpperCase()}
                  </h4>
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  </div>
);

export default Recipes;
