import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import NavBar from '../Navbar';
import './home.css';
import Map from '../map/map';
import WeatherCard from '../Weather/weatherCard';
import { useNavigate } from 'react-router-dom';
import Forecast from '../Weather/Forecast';
import HeroSection from '../../hero-section/Hero';
import PlacesList from '../map/Atraction'
import CityAttractions from '../map/showCityAttraction';
function App() {
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [rating, setRating] = useState(0);
   const [attractions, setAttractions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);

  
  const navigate = useNavigate();

 
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  
  useEffect(() => {
    if (places) {
      const filtered = places.filter((place) => place.rating > rating);
      setFilteredPlaces(filtered);
    }
  }, [rating, places]);

 
  useEffect(() => {
    const fetchWeather = async () => {
      if (coordinates.lat && coordinates.lng) {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;
        try {
          const { data } = await axios.get(weatherUrl);
          setWeatherData(data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    };

    fetchWeather();
  }, [coordinates]);

  const ExploreMap=()=>{
    navigate('/places')

  }
  


  return (
    <div className="App">
      
      <HeroSection title="Welcome to ClimeQuest" subtitle="Discover and plan your perfect trips by choosing destinations with the ideal weather conditions, ensuring an unforgettable travel experience every time.”" />
         <div className='button-container'>
          <button className="Explore-button" onClick={ExploreMap}>Let's Explore</button>
         </div>
       
      <div className='Container-for-Map'>
          
          <div className="map-container">
          
            
          </div>
      </div>
      

      
     
     

    

      <div className="weather-section">
        <div className="weather-container">
          <WeatherCard coordinates={coordinates} />


        </div>
        <div>
          <Forecast coordinates={coordinates} />
        </div>
      </div><CityAttractions/>
    </div>
  );
}

export default App;
