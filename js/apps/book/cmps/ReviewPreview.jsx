import { StarRating } from './StarRating.jsx'

export function ReviewPreview ({review}){
  const deletReview = () =>{
      
  }
    return(
        <div className="card-review">
            <div>
            <span>{review.name}</span>
            <span><StarRating rating={review.stars}/></span>
            <h4>Date of reading: {review.readDate}</h4>
            <h4>Comment:</h4>
            <p>{review.comment}</p>
            </div>
            <button onClick={deletReview}>X</button>
        </div>
    )
}