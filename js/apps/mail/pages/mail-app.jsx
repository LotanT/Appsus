import { MailList } from '../cmps/mail-list.jsx';
import { bookService } from '../../../services/mail.service.js';

export class MailApp extends React.Component {
    
  state = {
       mails: null,
       filterBy: null
      };
    
      componentDidMount(){
         this.loadMails()
      }

      loadMails = () =>{
        bookService.query().then(mails=>{
          this.setState({mails})
        })
      }

    render() {
      const {mails} = this.state
      if(!mails) return <h1>loading...</h1>
      return(
        <section className="mail-app">
          <MailList mails={mails}/>
        </section>
      )
    }

}