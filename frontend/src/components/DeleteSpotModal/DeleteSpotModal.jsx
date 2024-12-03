import { useDispatch } from "react-redux"
import { removeSpot } from "../../store/spotActions";
import { useModal } from "../../context/Modal";
import "./DeleteSpot.css";


function DeleteSpot({ spot }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(removeSpot(spot.id))
    };

    const handleKeep = () => {
        closeModal()
    }

    return (
        <div>
            <button onClick={handleDelete}>YES(Delete Spot)</button>
            <button onClick={handleKeep} className="grayButton">No(Keep Spot)</button>
        </div>
    )
}

export default DeleteSpot