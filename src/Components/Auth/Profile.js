import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // For alert popups

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch user profile data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace with a valid token if required
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const response = await axios.get(
          'https://climateroutebackend.onrender.com/api/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add authorization header if the API requires it
            },
          }
        );
        setUserData(response.data);
      } catch (err) {
        // Display an error alert using SweetAlert2
        Swal.fire({
          title: 'Error!',
          text: 'Error fetching user data. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Navigate to login if unauthorized
  const toLogin = () => {
    Swal.fire({
      title: 'Redirecting to Login',
      text: 'You need to log in to view your profile.',
      icon: 'info',
      confirmButtonText: 'Go to Login',
    }).then(() => {
      navigate('/login');
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={toLogin}>Go to Login</button>
      </div>
    );
  }

  return (
    <div>
      <h2>User Profile</h2>
      {userData && (
        <div>
          <p>Email: {userData.email}</p>
          <p>Phone Number: {userData.phonenumber}</p>
          <p>Username: {userData.username}</p>
          <p>Joined: {new Date(userData.createdAt).toLocaleDateString()}</p>
          <h3>Favorites</h3>
          <div>
            {userData.favorites && userData.favorites.length > 0 ? (
              <ul>
                {userData.favorites.map((favorite) => (
                  <li key={favorite.itemId}>
                    <h4>{favorite.name}</h4>
                    <p>Location: {favorite.location}</p>
                    <p>{favorite.description}</p>
                    <img
                      src={favorite.imageUrl}
                      alt={favorite.name}
                      style={{ width: '200px' }}
                    />
                    <p>
                      <strong>Weather Suggestion:</strong>{' '}
                      {favorite.weatherSuggestion}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No favorites found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
