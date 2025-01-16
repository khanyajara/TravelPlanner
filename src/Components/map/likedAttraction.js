import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2
import './Attraction.css';

const AttractionLike = ({ attraction }) => {
    const [liked, setLiked] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLike = async () => {
        try {
            const response = await axios.post('https://climateroutebackend.onrender.com/api/addFavorite', {
                name: attraction.name,
                address: attraction.address,
                location: attraction.location,
                types: attraction.types,
            });
            if (response.status === 200) {
                setLiked(true);
            }
        } catch (err) {
            if (err.response?.status === 401) {
                // Show SweetAlert2 modal and redirect to login
                Swal.fire({
                    title: 'Access Denied',
                    text: 'Please login to like attractions.',
                    icon: 'warning',
                    confirmButtonText: 'Go to Login',
                }).then(() => {
                    navigate('/login');
                });
            } else {
                setError(err.response?.data?.message || 'Failed to like attraction.');
            }
        }
    };

    return (
        <div className="AttractionLike">
            {liked ? (
                <p className="liked-message">❤️ You liked this attraction!</p>
            ) : (
                <button onClick={handleLike} className="like-button">
                    Like this Attraction
                </button>
            )}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default AttractionLike;
