import Axios from "axios";
let eco2data = Axios.get(
  "http://localhost:3100/Air_Quality_Sensor/eco2",
  {}
).then((response) => {
  allData = response.data;
});
console.log(eco2data + "//////////")

export let allData = eco2data;
