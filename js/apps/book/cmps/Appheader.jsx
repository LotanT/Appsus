
const {NavLink} = ReactRouterDOM

export function AppHeader(){
    return(
        <header className="app-header">
        <h1>Book Store</h1>
        <nav className="main-nav">
            <NavLink activeClassName="nav-active" exact to="/">Home</NavLink>
            <NavLink activeClassName="nav-active" to="/about">About</NavLink>
            <NavLink activeClassName="nav-active" to="/book">Our Books</NavLink>
        </nav>
      </header>
    )
}