import React, { useState, useEffect } from "react";
import "./recipe.css";
import ReactPlayer from "react-player";

const Recipe = ({ location }) => {
  const [meal, setMeal] = useState([]);

  // Get location prop passed by Link tag
  const recipe = location.state.recipe;
  useEffect(() => {
    const apiCall = async () => {
      const req = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`
      );
      const data = await req.json();
      setMeal(data.meals[0]);
    };
    apiCall();
  }, [recipe]);

  const ingredients = [];
  //   Format ingredients from API
  const formatIngredients = () => {
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }
  };

  formatIngredients();

  //   Format instructions to display line breaks
  const instructions =
    meal.strInstructions &&
    meal.strInstructions.replace(/(\r\n|\r|\n)/g, "<br>");

  return (
    <>
      <div className="container my-5">
        <div className="row active-recipe">
          <div className="col-lg-5">
            <img
              className="active-recipe-image img-fluid"
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />
          </div>
          <div className="col-lg-7">
            <div className="active-recipe-desc">
              <h2 className="active-recipe-title">{meal.strMeal}</h2>
              <p className="active-recipe-subtitle">{meal.strArea}</p>
              <br />
              <hr />
            </div>
            <div className="ingr text-center">
              <div>
                <h4 className="ingr-title">Ingredients</h4>
              </div>
              <div className="ingr-text">
                <ul>
                  {ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="instr text-center mt-4">
            <hr />
            <div>
              <h4 className="ingr-title">Method</h4>
            </div>
            <div
              className="instr-text text-justify"
              dangerouslySetInnerHTML={{ __html: instructions }}
            ></div>
          </div>

          {meal.strYoutube ? (
            <div className="video mt-4">
              <hr />
              <div className="text-center">
                <h4 className="video-title">Video</h4>
              </div>
              <ReactPlayer
                url={meal.strYoutube}
                controls={true}
                className="videobox"
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Recipe;
