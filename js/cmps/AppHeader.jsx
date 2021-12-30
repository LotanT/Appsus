
const { NavLink, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {


    render() {
        return (
            <header className="app-header" >
                <h1 onClick={() => this.props.history.push('/')}><img src="../imgs/favicon.png"/><span>AppSus</span></h1>
                <nav className="main-nav">
                    <NavLink activeClassName="my-active" exact to="/">Home</NavLink>
                    {/* <NavLink to="/about">About</NavLink> */}
                    <NavLink to="/notes">Notes</NavLink>
                    <NavLink to="/mail">Mails</NavLink>
                    <NavLink to="/book">Our Books</NavLink>
                </nav>
            </header>
        )
    }
}

export const AppHeader = withRouter(_AppHeader)