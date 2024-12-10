import { useDispatch } from "react-redux"
import { removeSpot } from "../../store/spotActions";
import { useModal } from "../../context/Modal";
import "./DeleteSpot.css";


function DeleteSpot({ spot }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(removeSpot(spot.id))
        closeModal()
    };

    const handleKeep = () => {
        closeModal()
    }

    return (
        <div className="delete-modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this spot from the listing?</p>
            <div className="spot-buttons">
                <button onClick={handleDelete}>YES(Delete Spot)</button>
                <button onClick={handleKeep} className="grayButton">No(Keep Spot)</button>
            </div>
        </div>
    )
}

export default DeleteSpot