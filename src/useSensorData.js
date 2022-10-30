import { useState, useEffect } from "react";
import { csv } from "d3";

// const row = d => {
//   d.coords = d['Location Coordinates'].split(',').map(d => +d).reverse();
//   d['Total Dead and Missing'] = + d['Total Dead and Missing'];
//   d['Reported Date'] = new Date(d['Reported Date']);
//   return d;
// };

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    Axios.post("http://localhost:3100/data", {
        user_id: user_id,
        password: password,
      }).then((response) => {
        console.log(response);
        setData(response.data);
      });  }, []);

  return data;
};
