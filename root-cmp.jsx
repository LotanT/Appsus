import { AppHeader } from './js/cmps/AppHeader.jsx';
import { MailApp } from './js/apps/mail/pages/mail-app.jsx';
import {NoteIndex} from './js/apps/keep/pages/note-index.jsx'
import { Home } from './js/pages/app-home.jsx';


const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

export function App() {
    return <Router>
                     <section className="app">
                        <header>
                     <AppHeader />
                        </header>
                            <main>
                                <section>
                                   <Switch>
                                   <Route component={MailApp} path="/mail" />
                                   <Route component={NoteIndex} path="/notes" /> 
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
