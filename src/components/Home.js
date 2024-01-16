import { React, useState, useEffect } from "react";
import "./Home.css";
const Home = () => {
  const [quote, setQuotes] = useState("");
  const [errors, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleClick = () => {
    window.location.reload();
  };
  useEffect(() => {
    var fetchData = async () => {
      try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        if (!response.ok) {
          throw new Error("Network response was snot ok");
        }
        setQuotes(data);
        console.log(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
    if (loading) {
      return <p>Loading...</p>;
    }
  if (errors) {
    return <p>Error...{errors.message}</p>;
  }

  return (
    <>
      <div className="cards">
        <div className="singleCard">
          {quote.content && (
            <div className="content">
              <div className="quote">
                <h1>{quote.content && quote.content}</h1>
              </div>
              <div className="quote_author">- {quote.author}</div>
            </div>
          )}
        </div>
        <div className="buttons">
          <button className="newBtn" onClick={handleClick}>
            New Quote
          </button>
          <button className="shareBtn">Share</button>
        </div>
      </div>
    </>
  );
};

export default Home;
