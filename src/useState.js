
import React, { useState, useEffect } from "react";

function  UseStateB(){

  const [hasError, setErrors] = useState(false);
  
  const [planets, setPlanets] = useState({});

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://worldclockapi.com/api/json/est/now");
      res
        .json()
        .then(res => setPlanets(res))
        .catch(err => setErrors(err));
    }

    fetchData();
  });

  return (
           <div>
               <h1>Result</h1>
               <h3> Result:</h3>
      <span>{JSON.stringify(planets['currentFileTime'])}</span>
      <h3> Error:</h3>
      <span> {JSON.stringify(hasError)}</span>
    </div>
  );
};

export default UseStateB
