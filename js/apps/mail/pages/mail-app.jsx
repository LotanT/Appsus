import { mailService } from '../services/mail.service.js';
import { MailList } from '../cmps/mail-list.jsx';
import { MailNav } from '../cmps/mail-nav.jsx';

export class MailApp extends React.Component {
    
  state = {
       mails: null,
       filterBy: null
      };
    
      componentDidMount(){
         this.loadMails()
      }

      loadMails = () =>{
        mailService.query().then(mails=>{
          this.setState({mails})
        })
      }


    render() {
      const {mails} = this.state
      if(!mails) return <h1>loading...</h1>
      return(
        <section className="mail-app">
          <MailNav />
          <MailList mails={mails}/>
        </section>
      )
    }

}