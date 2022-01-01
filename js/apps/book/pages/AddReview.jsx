import {bookService} from '../services/book.service.js'
import{utilService}from '../services/util.service.js'
import { eventBusService } from '../../../services/event-bus.service.js'

export function AddReview(match) {

   const onSubmitReview = (ev) =>{
    ev.preventDefault()
    
    let name = (ev.target.name.value)? ev.target.name.value: 'Books Reader';
    
    let starNum = 0;
    if(ev.target['rating-5'].checked) starNum = 5;
    else if(ev.target['rating-4'].checked) starNum = 4;
    else if(ev.target['rating-3'].checked) starNum = 3;
    else if(ev.target['rating-2'].checked) starNum = 2;
    else if(ev.target['rating-1'].checked) starNum = 1;

    const review = {
        id: utilService.makeId(),
        name: name,
        stars: starNum,
        readDate: ev.target.readAt.value,
        comment: ev.target.textArea.value
    }
    bookService.addReview(match.match.params.bookId,review)
    match.history.push(`/book/${match.match.params.bookId}`)
    eventBusService.emit('refresh')
    
   }
   const goBack = () => {
    match.history.push(`/book/${match.match.params.bookId}`)
  };

  return (
    <form className="add-review" onSubmit={onSubmitReview}>
      <label htmlFor="name">Name: </label>
      <input type="text" placeholder="Enter your name" id="name" />
      <div className="star-rating">
        <div className="star-input" id="starInput">
          <input type="radio" name="rating" id="rating-5" />
          <label htmlFor="rating-5" className="fas fa-star"></label>
          <input type="radio" name="rating" id="rating-4" />
          <label htmlFor="rating-4" className="fas fa-star"></label>
          <input type="radio" name="rating" id="rating-3" />
          <label htmlFor="rating-3" className="fas fa-star"></label>
          <input type="radio" name="rating" id="rating-2" />
          <label htmlFor="rating-2" className="fas fa-star"></label>
          <input type="radio" name="rating" id="rating-1" />
          <label htmlFor="rating-1" className="fas fa-star"></label>
          <span className="rating-reaction"></span>
        </div>
      </div>
      <label htmlFor="readAt">Read at:</label>
      <input type="date" placeholder="Enter your name" id="readAt" />
      <div>
      <label htmlFor="textArea">Comment:</label>
      </div>
      <div>
      <textarea id="textArea" name="text-area" rows="4" cols="30"></textarea>
      </div>
      <div className="review-btn">
      <button type="submit">Submit</button>
      <button onClick={goBack}>Back</button>
      </div>
    </form>
  );
}
