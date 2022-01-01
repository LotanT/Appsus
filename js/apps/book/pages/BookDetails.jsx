import { LongTxt } from '../cmps/LongTxt.jsx';
import { bookService } from '../services/book.service.js';
import { ReviewPreview } from '../cmps/ReviewPreview.jsx';
import { AddReview } from './AddReview.jsx';
import { eventBusService } from '../../../services/event-bus.service.js';
const {Link, Route} = ReactRouterDOM;

export class BookDetails extends React.Component {
  state = {
    isLongTxtShown: false,
    book: null,
  };
  
  componentDidMount() {
    this.loadBooks()
    eventBusService.on("refresh", this.loadBooks)
  }

  loadBooks = () =>{
    bookService.getBookById(this.props.match.params.bookId).then((book) => {
      if (!book) return this.props.history.push('/');
      this.setState({ book: book });
    });
  }

  getCurrencySymbol = (currencyCode) => {
    switch (currencyCode) {
      case 'EUR':
        return '€';
      case 'ILS':
        return '₪';
      case 'USD':
        return '$';
    }
  };

  getReadingTime = (pageCount) => {
    if (pageCount < 100) return 'Light Reading (less then 100 pages)';
    if (pageCount > 500) return 'Long reading (more than 500 pages)';
    if (pageCount > 200) return 'Decent Reading (more than 200 pages)';
  };

  getBookPublished = (publishedDate) => {
    const now = new Date().getFullYear();
    if (now - publishedDate < 1) return 'New!';
    if (now - publishedDate > 10) return 'Veteran Book';
  };

  getClassNameByPrice = (price) => {
    if (price < 20) return 'cheap';
    if (price > 150) return 'expensive';
  };

  toggleLengthDescription = () => {
    this.setState({ isLongTxtShown: !this.state.isLongTxtShown });
  };

  goBack = () => {
    this.props.history.push('/book');
  };

  render() {
    let book = this.state.book;
    if (!book) return <p>loading...</p>;
    const priceClassName = this.getClassNameByPrice(book.listPrice.amount);
    const bookAge = this.getBookPublished(book.publishedDate);
    const bookLength = this.getReadingTime(book.pageCount);
    const symbol = this.getCurrencySymbol(book.listPrice.currencyCode);

    return (
      <section className="book-details">
        <img src={book.thumbnail} alt="" />
        <div className="details-container">
          <h1>{book.title}</h1>
          <h5>{book.subtitle}</h5>
          <h4>Authors: {book.authors}</h4>
          <h4>
            Price:{' '}
            <span className={priceClassName}>{book.listPrice.amount}</span>
            {symbol}
          </h4>
          <h4>
            published at: {book.publishedDate}{' '}
            {bookAge && <span>{bookAge}</span>}
          </h4>
          {bookLength && <h4>{bookLength}</h4>}
          <LongTxt
            txt={book.description}
            isLongTxtShown={this.state.isLongTxtShown}
            onToggleDescription={this.toggleLengthDescription}
          />
          <span className="button" onClick={this.goBack}>Back</span>
          <div className="button"><Link to={`/book/${book.id}/review`}><span>Add review</span></Link>
          <Route component={AddReview} path={`/book/:bookId/review`} />
          </div>
        </div>
        <div className="review-container">
          {book.reviews && <h2>Reviews:</h2>}
        {book.reviews && book.reviews.map(review => <ReviewPreview key={review.id} review={review} />)}
        </div>
      </section>
    );
  }
}
