import { useState } from "react";
import { FaStar } from "react-icons/fa";
import './ReviewModal.css'


function StarRating({ onRate }) {
    const [rating, setRating] = useState(0);

    const handleClick = (starIndex) => {
        setRating(starIndex + 1);
        onRate(starIndex + 1);
    };


    return (
        <div className="star-rating">
            <label >
            {[...Array(5)].map((_, index) => (
                
                <span
                    key={index}
                    className={`star ${index < rating ? 'filled' : ''}`}
                    onClick={() => handleClick(index)}
                >
                    <FaStar />
                </span> 
            ))}
            Stars</label>
        </div>
    )
}


export default StarRating