
const { NavLink, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {


    render() {
        return (
            <header className="app-header" >
                <h1 onClick={() => this.props.history.push('/')}>AppSus</h1>
                <nav className="main-nav">
                    <NavLink activeClassName="my-active" exact to="/">Home</NavLink>
                    {/* <NavLink to="/about">About</NavLink> */}
                    <NavLink to="/notes">Notes</NavLink>
                </nav>
            </header>
        )
    }
}

export const AppHeader = withRouter(_AppHeader)