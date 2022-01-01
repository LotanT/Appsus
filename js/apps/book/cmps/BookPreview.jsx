
const {Link} = ReactRouterDOM

export function BookPreview({ book }) {
  let symbol;
  switch (book.listPrice.currencyCode) {
    case 'EUR':
      symbol = '€';
      break;
    case 'ILS':
      symbol = '₪';
      break;
    case 'USD':
      symbol = '$';
      break;
  }
  return (
    <Link className="clean-link" to={`/book/${book.id}`}>
    <article className="book-preview">
      <img src={book.thumbnail} alt="" />
      <h4>{book.title}</h4>
      <h4>Price: {(book.listPrice.amount + symbol)}</h4>
    </article>
    </Link>
  );
}
