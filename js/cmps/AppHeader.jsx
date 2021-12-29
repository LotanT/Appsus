
const { NavLink, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {


    render() {
        return (
            <header className="app-header" >
                <h1 onClick={() => this.props.history.push('/')}>Book Library</h1>
                <nav className="main-nav">
                    <NavLink activeClassName="my-active" exact to="/">Home</NavLink>
                    <NavLink to="/mail">Mails</NavLink>
                    <NavLink to="/book">Our Books</NavLink>
                </nav>
            </header>
        )
    }
}

export const AppHeader = withRouter(_AppHeader)