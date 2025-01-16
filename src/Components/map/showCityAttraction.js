import React, { useState, useEffect } from 'react';
import axios from 'axios';
import css from './Attraction.css'
import AttractionLike from './likedAttraction';




const AttractionsList = ({ city, radius = 5000 }) => {
    const [attractions, setAttractions] = useState([]);
    const [weather, setWeather] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState(null);
    // Get the user's current location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (err) => {
                    setError('Unable to retrieve location.');
                    setLoading(false);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
            setLoading(false);
        }
    }, []);
    // Fetch attractions and weather once location is available
    useEffect(() => {
        if (location || city) {
            const fetchAttractions = async () => {
                try {
                    const params = city
                        ? { city, radius }
                        : { latitude: location.latitude, longitude: location.longitude, radius };
                    const response = await axios.get('https://climateroutebackend.onrender.com/api/search', { params });
                    setAttractions(response.data.attractions);
                    setWeather(response.data.weather);
                    setSuggestions(response.data.suggestions);
                    setLoading(false);
                    
                } catch (error) {
                    setLoading(false);
                    setError(error.response?.data?.message || 'Something went wrong');
                }
            };
            fetchAttractions();
        }
    }, [location, city, radius]);
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
    return (
        <div className='HomePage-Attractions'>
            <h2>Activity Suggestions:</h2>
            < div>
                {suggestions.map((suggestion, index) => (
                    <p key={index}>{suggestion}</p>
                ))}
            </div>
            <h2>Attractions Near You:</h2>
            <div className='Card-container' >
                {attractions.length > 0 ? (
                    attractions.map((attraction, index) => (
                        <div key={index} className='Cards'>
                            <h3>{attraction.name}</h3>
                            <p> 📍{attraction.address}</p>
                            <p>Location: {attraction.location.lat}, {attraction.location.lng}</p>
                            <p>Types: {attraction.types.join(', ')}</p>
                            <AttractionLike attraction={attraction} />

                        </div>
                    ))
                ) : (
                    <p>No attractions found.</p>
                )}
            </div>
        </div>
    );
};
export default AttractionsList;