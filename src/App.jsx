import { Route, Routes } from "react-router-dom";
import SearchBox from "./compoenents/SearchBox.jsx";
import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const stateContext = createContext();
function App() {
  const [drinks, drinksUpdate] = useState([]);

  //Initial request update
  useEffect(() => {
    axios
      .get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=")
      .then((response) => drinksUpdate(response.data.drinks));
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <stateContext.Provider value={[drinks, drinksUpdate]}>
              <SearchBox />
            </stateContext.Provider>
          }
        />
        {drinks == null ||
          drinks.map((drinkObj) => (
            <Route
              path={"/" + drinkObj.strDrink}
              element={
                <>
                  <img src={drinkObj.strDrinkThumb} width={300} height={300} />
                  <h1>{drinkObj.strDrink}</h1>
                  <h1>DrinkID: {drinkObj.idDrink}</h1>
                  <h1>Glass: {drinkObj.strGlass}</h1>
                  <h1>Instructions: {drinkObj.strInstructions}</h1>
                </>
              }
            />
          ))}
      </Routes>
    </>
  );
}

export default App;
