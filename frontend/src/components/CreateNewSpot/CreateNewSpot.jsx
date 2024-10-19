import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSpot } from "../../store/spotActions";
import './CreateNewSpot.css'
import { FiDollarSign } from "react-icons/fi";
function CreateNewSpot() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [spotData, setSpotData] = useState({
        address: '',
        city: '',
        state: '',
        country: '',
        lat: '',
        lng: '',
        name: '',
        description: '',
        price: ''
    });

    const [errors, setErrors] = useState({})

    const handleChange = (event) => {
        setSpotData({
            ...spotData,
            [event.target.name]: event.target.value
        })
    };

    const handleSubmit = async (event) => {
        event.preventDefalut();
        try {
            const newSpot = await dispatch(createSpot(spotData));
            if (response.errors) {
                setErrors(response.errors);
                return;
            }
            navigate(`/spots/${newSpot.id}`)
        } catch (e) {
            console.error('Error creating spot.', e);
        }
    };



return (
  <form onSubmit={handleSubmit} className="createSpotForm">
    <h1 className="create-h1">Create New Spot</h1>
    <h3>Where's your place located?</h3>
    <p>Guests will only get your exact address once they booked a reservation.</p>
    <label className="create-label">Country:
      <input
        type="text"
        name="country"
        value={spotData.country}
        onChange={handleChange}
        className="create-input"
        placeholder="Country"
      />
    </label>
    <label className="create-label">Address:
      <input
        type="text"
        name="address"
        value={spotData.address}
        onChange={handleChange}
        className="create-input"
        placeholder="Address"   
      />
    </label>
    <div className="citystate">
        <label className="create-label">City:
        <input
            type="text"
            name="city"
            value={spotData.city}
            onChange={handleChange}
            className="create-input-city"
            placeholder="City"
        />
        </label>
        <label className="create-label">State:
        <input
            type="text"
            name="state"
            value={spotData.state}
            onChange={handleChange}
            className="create-input-state"
            placeholder="State"
        />
        </label>
    </div>  
    {/* <label className="create-label">Latitude:
      <input
        type="text"
        name="lat"
        value={spotData.lat}
        onChange={handleChange}
        className="create-input"
      />
    </label>
    <label className="create-label">Longitude:
      <input
        type="text"
        name="lng"
        value={spotData.lng}
        onChange={handleChange}
        className="create-input"
      />
    </label> */}
    <div className="description-border">
        <label className="create-label">
            <h4>Describe your place to guests</h4>
            <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about your neighborhood.</p>
        <input
            type="text"
            name="description"
            value={spotData.description}
            onChange={handleChange}
            className="create-input-description"
            placeholder="Please write at least 30 characters"
        />
        </label>
    </div>
    <div className="title-border">
        <label className="create-label">
            <h4>Create a title for your spot</h4>
            <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
        <input
            type="text"
            name="name"
            value={spotData.name}
            onChange={handleChange}
            className="create-input"
            placeholder="Name of your spot"
        />
        </label>
    </div>
    <div className="price-border">
        <label className="create-label">
            <h4>Set a base price for your spot</h4>
            <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
            <FiDollarSign /><input
            type="text"
            name="price"
            value={spotData.price}
            onChange={handleChange}
            className="create-input"
            placeholder="Price per night (USD)"
        />
        </label>
    </div>
    <div className="photos">
        <label className="create-label">
            <h4>Liven up your spot with photos</h4>
            <p>Submit a link to at least one photo to publish your spot</p>
        <input
            type="text"
            name="price"
            value={spotData.price}
            onChange={handleChange}
            className="create-input"
            placeholder="Preview Image URL"
        />
        </label>
        <label className="create-label">
            <input
            type="text"
            name="photo2"
            value={spotData.photo2}
            onChange={handleChange}
            className="create-input"
            placeholder="Image URL"
            />
        </label>
        <label className="create-label">
            <input
            type="text"
            name="photo3"
            value={spotData.photo3}
            onChange={handleChange}
            className="create-input"
            placeholder="Image URL"
            />
        </label>
        <label className="create-label">
            <input
            type="text"
            name="photo4"
            value={spotData.photo4}
            onChange={handleChange}
            className="create-input"
            placeholder="Image URL"
            />
        </label>
        <label className="create-label">
            <input
            type="text"
            name="photo5"
            value={spotData.photo5}
            onChange={handleChange}
            className="create-input"
            placeholder="Image URL"
            />
        </label>
    </div>
    <button type="submit" className="create-button">Create Spot</button>
  </form>
);
}

export default CreateNewSpot; 