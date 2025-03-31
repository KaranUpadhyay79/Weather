
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';
import {useState} from "react";

export default function SearchBox({updateInfo}) {
    let[city , setCity] = useState("");
    let[error , setError] = useState(false);

    const API_URL = "https://api.openweathermap.org/data/2.5/weather?";
    const API_KEY = "2259e7d77f6494c56b18acccf29761e3";

    let getWeatherInfo = async () => {
        try{
        let response = await fetch(`${API_URL}q=${city}&appid=${API_KEY}&units=metric`);
        let jsonResponse = await response.json();
        //console.log(jsonResponse);
        let result = {
            city: city,
            temp: jsonResponse.main.temp,
            tempMin: jsonResponse.main.temp_min,
            tempMax: jsonResponse.main.temp_max,
            humidity: jsonResponse.main.humidity,
            feelsLike: jsonResponse.main.feels_like,
            weather:jsonResponse.weather[0].description,
        };
        console.log(result);
        return result;
       }catch(err) {
         throw err;
       }
    };

    let handleChange = (evt) => {
        setCity(evt.target.value);
    };

    let handleSubmit = async (evt) => {
      try{
        evt.preventDefault();
        console.log(city);
        setCity("");
        setError(false); 
        let newinfo = await getWeatherInfo();
        updateInfo(newinfo);
      }catch(err) {
        setError(true);
        console.log(err);
      }
      
    };

    return (
        <div className="SearchBox">
            <form onSubmit={handleSubmit}>
              <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handleChange} className="search-input"/>
              <br></br>
              <br></br>
              <Button variant="contained" type="submit">Search</Button>
              {error && <p style={{color:"red"}}>No such place exists!</p>}
            </form>
        </div>
    )
}