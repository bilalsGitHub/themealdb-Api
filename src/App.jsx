import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        //ALT # İLE OLUYOR
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      setItems(response.data.meals);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
    setSearchTerm("");
  };

  const itemlist = items.map(({ strMeal, strMealThumb, idMeal }) => {
    return (
      <section key={idMeal} className="card">
        <img src={strMealThumb} />
        <section className="content">
          <p>{strMeal}</p>
          <p>{idMeal}</p>
        </section>
      </section>
    );
  });

  return (
    <>
      <div className="body">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Themealdb Api </h2>
          <div className="inputfield">
            <input
              value={searchTerm}
              className="food-input"
              type="text"
              placeholder="Type in"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
        <div className="items-container">{itemlist}</div>
      </div>
    </>
  );
}

export default App;
