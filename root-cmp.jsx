import { AppHeader } from './js/cmps/AppHeader.jsx'

import {Home} from './js/pages/app-home.jsx'
// import {BookApp} from './pages/BookApp.jsx'
// import {BookDetails} from './pages/BookDetails.jsx'
// import {BookAddReview} from './pages/BookAddReview.jsx'


const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
                     <section className="app">
                        <header>
                     <AppHeader />
                        </header>
                            <main>
                                <section>
                                   <Switch>
                                   {/* <Route component={BookAddReview} path="/book/review/:bookId?" />
                                   <Route component={BookDetails} path="/book/:bookId" />
                                   <Route component={BookApp} path="/book" /> */}
                                   <Route component={Home} path="/" />
                                   </Switch>
                               </section>
                        </main>
                      </section>
          </Router>
}








// Using Class:
// export class App extends React.Component {
//     render() {
//         return (
//             <div>
//                 <header>
//                     <h1>Lets Play</h1>
//                 </header>
//                 <main>
//                     <Home />
//                 </main>
//             </div>
//         )
//     }
// }

// Some Basic routing:
// export class App extends React.Component {
//     state = {
//         page: 'home'
//     }
//     goPage = (page)=>{
//         this.setState({page})
//     }
//     render() {
//         const {page} = this.state
//         return <section className="app">
//             <header>
//                 <h1>My App</h1>
//                 <nav>
//                     <a href="#" onClick={()=>{
//                         this.goPage('home')
//                     }}>Home</a> |
//                     <a href="#" onClick={()=>{
//                         this.goPage('about')
//                     }}>About</a>
//                 </nav>
//             </header>
//             <main>
//                 {page === 'home' && <Home />}
//                 {page === 'about' && <About />}
//             </main>
//         </section>

//     }
// }

