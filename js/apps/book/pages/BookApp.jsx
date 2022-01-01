import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookDetails } from './BookDetails.jsx'

export class BookApp extends React.Component {

    state = {
        books: [],
        filterBy: null,
    }

    componentDidMount() {
        this.loadBooks()
    }


    loadBooks = () => {
        const { filterBy } = this.state
        bookService.query(filterBy).then(books => {
            this.setState({ books })
        })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks)
    }

    // onRemoveCar = (bookId) => {
    //     carService.removeCar(bookId).then(() => {
    //         const newCars = this.state.cars.filter(car => car.id !== carId)
    //         this.setState({ cars: newCars }, this.onBack)
    //     })
    // }

    render() {
        const { books } = this.state
        return (
            <section className="book-app">
                        <BookFilter filterBy={this.state.filterBy} onSetFilter={this.onSetFilter}/>
                        <BookList books={books} />
            </section>
        )
    }
}
