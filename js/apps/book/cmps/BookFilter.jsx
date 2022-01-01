

export class BookFilter extends React.Component {
    state = {
        filterBy: {
            name: '',
            maxPrice: '',
            minPrice: ''
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            // this.props.onSetFilter(this.state.filterBy)
        })
    }

    onSubmitFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
        this.cleanForm()
    }

    cleanForm = () => {
        this.setState({ filterBy: { name: '', maxPrice: '', minPrice: '' } })
    }

    render() {
        const { filterBy: {name, maxPrice, minPrice} } = this.state
        return (
            <form className="book-filter" onSubmit={this.onSubmitFilter}>
                <label
                    htmlFor="by-name">Name:</label>
                <input
                    placeholder=""
                    type="text"
                    id="by-name"
                    name="name"
                    value={name}
                    onChange={this.handleChange} />
                <label
                    htmlFor="by-max-price">Max Price:</label>
                <input
                    placeholder=""
                    type="number"
                    id="by-max-price"
                    name="maxPrice"
                    value={maxPrice}
                    onChange={this.handleChange} />
                <label
                    htmlFor="by-min-price">Min Price:</label>
                <input
                    placeholder=""
                    type="number"
                    id="by-min-price"
                    name="minPrice"
                    value={minPrice}
                    onChange={this.handleChange} />
                <button>Filter</button>
            </form>
        )
    }
}