import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateSpotDetails } from "../../store/spotActions";
import { FiDollarSign } from "react-icons/fi";

const UpdateSpot = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const {spotId} = useParams();
    const location = useLocation();
    const spot = location.state;

    console.log('SPOTS INFO -->', spot)
    
    console.log('Are you even doing anything', spotId)

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    // const [lat,] = useState('');
    // const [lng, ] = useState('');
    const [name, setName] = useState('');
    const [description, setDes] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (spot) {
            console.log('SPOTS INFO -->', spot)
            setAddress(spot.address)
            setCity(spot.city)
            setState(spot.state)
            setCountry(spot.country)
            setName(spot.name)
            setDes(spot.description)
            setPrice(spot.price)
        }
    }, []);

    const validateForm = () => {
        let isValid = true;

        const  address = document.getElementById('address').value;     
        const  city = document.getElementById('city').value;
        const  state = document.getElementById('state').value;  
        const  country = document.getElementById('country').value;  
        const  name = document.getElementById('name').value;  
        const  description = document.getElementById('description').value;  
        const  price = document.getElementById('price').value;
        // const previewImg = document.getElementById('previewImg')

        document.getElementById('priceError').textContent = '';
        document.getElementById('descriptionError').textContent = '';
        document.getElementById('previewImgError').textContent = '';
        
        if(description.length > 30) {
            document.getElementById('descriptionError').textContent = 'Description needs 30 or more characters.'
            isValid = false
        }

        if(!address) {
            document.getElementById('addressError').textContent = 'Adress is required.'
            isValid = false
        }        
        if(!city) {
            document.getElementById('cityError').textContent = 'City is required.'
            isValid = false
        }
        if(!state) {
            document.getElementById('stateError').textContent = 'State is required'
            isValid = false
        }
        if(!country) {
            document.getElementById('countryError').textContent = 'Country is required'
            isValid = false
        }
        if(!name) {
            document.getElementById('nameError').textContent = 'Name is required'
            isValid = false
        }

        if( !price || isNaN(price) ){
            document.getElementById('priceError').textContent = 'Price is required'
            isValid = false
        }

        // if(!previewImg) {
             // document.getElementById('previewImg').textContent = 'Preview Image requiered'
        //     isValid = false
        // }

        return isValid
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
            if (validateForm) {
                console.log('START')
                const spotData = {
                    id: spot.id,
                    address,
                    city,
                    state,
                    country,
                    name,
                    description,
                    price: parseFloat(price),
                    // previewImg,
                    // images: images.split(',').map(url => url.trim())
                }
                console.log('Next step!!')
                console.log('===>', spotData)
                const newSpot = await dispatch(updateSpotDetails(spotData));
                console.log('Dispatch??')
                console.log("Submitted",newSpot)
                navigate(`/spots/${newSpot.id}`)

             
            }
    } 
    
    return (
        <form onSubmit={handleSubmit} className="createSpotForm">
          <h1 className="create-h1">Update Spot</h1>
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
            <div id= "country" className="error"></div>
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
            <div id="addressError" className="error"></div>
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
              </label>
              <div id="cityError" className="error"></div>
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
              <div id="stateError" className="error"></div>
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
              <textarea
                  id= 'description'
                  name="description"
                  value={description}
                  onChange={(e) => setDes(e.target.value)}
                  className="create-input-description"
                  placeholder="Please write at least 30 characters"
              />
              <div id="descripError" className="error"></div>
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
             <div id ="nameError" className="error"></div>
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
              <div id= "priceError" className="error"></div>
              </label>
          </div>
          {/* <div className="photos">
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
              </label>
              <div id= "previewImgError" className="error"></div>
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
          </div> */}
          <button type="submit" className="create-button">Update Spot</button>
        </form>
      );

}

export default UpdateSpot