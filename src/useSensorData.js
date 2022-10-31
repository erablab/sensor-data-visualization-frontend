import { useState, useEffect } from "react";
import { csv } from "d3";

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
