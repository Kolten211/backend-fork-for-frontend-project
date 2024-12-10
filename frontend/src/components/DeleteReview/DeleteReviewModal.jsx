import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { removeReview } from "../../store/review";




function DeleteReview({review}){
    console.log('Whats your info',review)
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    

    const handleDelete = () => {
        dispatch(removeReview(review.id))
        closeModal()
    }


    const handleKeep = () => {
        closeModal()
    }

    return (
        <div className="delete-modal">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to remove this review?</p>
        <div className="spot-buttons">
            <button onClick={handleDelete}>YES(Delete Review)</button>
            <button onClick={handleKeep} className="grayButton">No(Keep Review)</button>
        </div>
    </div>
    )
}

export default DeleteReview