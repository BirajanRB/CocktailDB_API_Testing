import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { stateContext } from "../App";

function SearchBox() {
  const [drinks, drinksUpdate] = useContext(stateContext);

  //Search Box Handle
  let handleChange = (elem) => {
    console.log(elem.target.value);
    axios
      .get(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
          elem.target.value
      )
      .then((response) => drinksUpdate(response.data.drinks));
  };
  return (
    <>
      <h1>Search..</h1>
      <input type="text" onChange={handleChange} />
      <div>
        {drinks == null ? (
          <h1>No Drinks Found</h1>
        ) : (
          drinks.map((drinkObj) => {
            return (
              <div>
                <h1>{drinkObj.strDrink}</h1>
                <Link to={"/" + drinkObj.strDrink}>
                  <img src={drinkObj.strDrinkThumb} width={100} height={100} />
                </Link>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default SearchBox;
