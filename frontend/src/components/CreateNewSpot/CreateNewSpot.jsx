import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSpot } from "../../store/spotActions";
import './CreateNewSpot.css'
import { FiDollarSign } from "react-icons/fi";

function CreateNewSpot() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    // const [lat,] = useState('');
    // const [lng, ] = useState('');
    const [name, setName] = useState('');
    const [description, setDes] = useState('');
    const [price, setPrice] = useState('');
    const [previewImg, setPreview] = useState('');
    const [images, setImages] = useState('');
    const [errors, setErrors] = useState({});


    const validateForm = () => {
        const newErrors = {};

        if (description < 30) {
            newErrors.description = 'Description needs 30 or more characters.'
        }

        if (!price) {
            newErrors.price = 'Price is required'
        }

        if(!address) {
           newErrors.address = 'Address is required.'
            
        }

        if(!city) {
            newErrors.city = 'City is required.'
            
        }

        if(!state) {
            newErrors.state = 'State is required'
           
        }

        if(!country) {
            newErrors.country = 'Country is required'
            
        }

        if(!name) {
            newErrors.name = 'Name is required'
            
        }

        if(!previewImg) {
            newErrors.previewImg = 'Preview Image requiered'
        } 

        // const  address = document.getElementById('address').value;     
        // const  city = document.getElementById('city').value;
        // const  state = document.getElementById('state').value;  
        // const  country = document.getElementById('country').value;  
        // const  name = document.getElementById('name').value;  
        // const  description = document.getElementById('description').value;  
        // const  price = document.getElementById('price').value;
        // const previewImg = document.getElementById('previewImg')
        // document.getElementById('priceError').textContent = '';
        // document.getElementById('descriptionError').textContent = '';
        // document.getElementById('previewImgError').textContent = '';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return false
        }
        setErrors(newErrors)
        return true
    }

    // const [errors, setErrors] = useState({})

    // const handleChange = (event) => {
    //     setSpotData({
    //         ...spotData,
    //         [event.target.name]: event.target.value
    //     })
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
            if (validateForm()) {
                console.log('START')
                const spotData = {
                    address,
                    city,
                    state,
                    country,
                    name,
                    description,
                    price: parseFloat(price),
                    previewImg,
                    images: images.split(',').map(url => url.trim())
                }
               
                console.log('===>', spotData)
                const newSpot = await dispatch(createSpot(spotData));
              
                console.log("Submitted",newSpot)
                navigate(`/spots/${newSpot.id}`)

             
            }
    } 
    



return (
  <form onSubmit={handleSubmit} className="createSpotForm">
    <h1 className="create-h1">Create New Spot</h1>
    <h3>Where&apos;s your place located?</h3>
    <p>Guests will only get your exact address once they booked a reservation.</p>
    <label className="create-label">Country:
      <input
        type="text"
        id="country"
        name="country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="create-input"
        placeholder="Country"
      />
      {errors.country && <p className="errors">{errors.country}</p>}
    </label>
    <label className="create-label">Address:
      <input
        type="text"
        id="address"
        name="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="create-input"
        placeholder="Address"   
      />
      {errors.address && <p className="errors">{errors.address}</p>}
    </label>
    <div className="citystate">
        <label className="create-label">City:
        <input
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="create-input-city"
            placeholder="City"
        />
        {errors.city && <p className="errors">{errors.city}</p>}
        </label>
        <label className="create-label">State:
        <input
            type="text"
            id="state"
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="create-input-state"
            placeholder="State"
        />
        {errors.state && <p className="errors">{errors.state}</p>}
        </label>
    </div>  

    <div className="description-border">
        <label className="create-label">
            <h4>Describe your place to guests</h4>
            <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about your neighborhood.</p>
        <textarea
            id= 'description'
            name="description"
            value={description}
            onChange={(e) => setDes(e.target.value)}
            className="create-input-description"
            placeholder="Please write at least 30 characters"
        />
        {errors.description && <p className="errors">{errors.description}</p>}
        </label>
    </div>
    <div className="title-border">
        <label className="create-label">
            <h4>Create a title for your spot</h4>
            <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
        <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="create-input"
            placeholder="Name of your spot"
        />
        {errors.name && <p className="errors">{errors.name}</p>}
        </label>
    </div>
    <div className="price-border">
        <label className="create-label">
            <h4>Set a base price for your spot</h4>
            <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
            <FiDollarSign /><input
            type="text"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="create-input"
            placeholder="Price per night (USD)"
        />
        {errors.price && <p className="errors">{errors.price}</p>}
        </label>
    </div>
    <div className="photos">
        <label className="create-label">
            <h4>Liven up your spot with photos</h4>
            <p>Submit a link to at least one photo to publish your spot</p>
        <input
            type="text"
            id= "previewImg"
            name="previewImg"
            value={previewImg}
            onChange={(e) => setPreview(e.target.value)}
            className="create-input"
            placeholder="Preview Image URL"
        />
        {errors.previewImg && <p className="errors">{errors.previewImg}</p>}
        </label>
        <label className="create-label">
            <input
            type="text"
            id="photo2"
            name="photo2"
            value={images}
            onChange={(e) => setImages(e.target.value)}
            className="create-input"
            placeholder="Image URL"
            />
        </label>
        <label className="create-label">
            <input
            type="text"
            id="photo3"
            name="photo3"
            value={images}
            onChange={(e) => setImages(e.target.value)}
            className="create-input"
            placeholder="Image URL"
            />
        </label>
        <label className="create-label">
            <input
            type="text"
            id="photo4"
            name="photo4"
            value={images}
            onChange={(e) => setImages(e.target.value)}
            className="create-input"
            placeholder="Image URL"
            />
        </label>
        <label className="create-label">
            <input
            type="text"
            id="photo5"
            name="photo5"
            value={images}
            onChange={(e) => setImages(e.target.value)}
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