import { eventBusService } from '../services/event-bus.service.js';
const { NavLink, withRouter } = ReactRouterDOM;

class _AppHeader extends React.Component {
  state = {
    isOpenModal: false,
    currPage: this.props.location.pathname.split('/')[1],
    filterValue:''
  }

  componentDidMount() {
    console.log(this.state.currPage)
  }
  componentDidUpdate(prevProps){
    if (prevProps.location.pathname.split('/')[1] !== this.props.location.pathname.split('/')[1]) {
    this.setState({currPage: this.props.location.pathname.split('/')[1]})}
    // console.log(this.state.currPage)


  }

  handleChange = (ev) => {
    const value = ev.target.value;
    this.setState({ filterValue: value });
    eventBusService.emit('search', value);
  };

  toggleModal = () => {
    const isOpenModal = !this.state.isOpenModal;
    this.setState({ isOpenModal })
  }
  closeModal = () => {
    const isOpenModal = false
    this.setState({ isOpenModal })
  }
  render() {

    const {currPage,filterValue} = this.state


    const activeModal = this.state.isOpenModal ? "modal-active" : "";
    return (
      <React.Fragment>

        <header className="app-header">
          <h1 onClick={() => this.props.history.push('/')}>
            <img src="../imgs/favicon.png" />
            <span>AppSus</span>
          </h1>

          {(currPage)&&<div className="search-bar">
            <img src="imgs/search.svg" />
            <input
              onChange={this.handleChange}
              type="text"
              name="search"
              value={filterValue}
              placeholder={'Search ' + currPage}
            />
          </div>}


          <img onClick={this.toggleModal} src="../imgs/apps-grid.png" />
        </header>



        <div onClick={this.closeModal} className={`screen-modal ${activeModal}`}></div>
        <nav className={`main-nav ${activeModal}`}>
          <NavLink onClick={this.closeModal} activeClassName="my-active" exact to="/">
            <img src="../imgs/app/nav/homepage.png" /><span>Home</span>
          </NavLink>
          {/* <NavLink to="/about">About</NavLink> */}
          <NavLink onClick={this.closeModal} to="/notes"><img src="../imgs/app/nav/google-keep.png" /><span>Notes</span></NavLink>
          <NavLink onClick={this.closeModal} to="/mail"><img src="../imgs/app/nav/gmail.png" /><span>Mail</span></NavLink>
          <NavLink onClick={this.closeModal} to="/book">Our Books</NavLink>
        </nav>

      </React.Fragment>
    );
  }
}

export const AppHeader = withRouter(_AppHeader);
