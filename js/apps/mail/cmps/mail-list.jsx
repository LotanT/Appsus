import { MailPreview } from './mail-preview.jsx';
import { mailService } from '../services/mail.service.js';
import { eventBusService } from '../../../services/event-bus.service.js';

export class MailList extends React.Component {
  state = {
    mails: null,
    mailOpen: null,
  };

  componentDidMount() {
    mailService.query().then(mails=>{
        this.setState({mails})
      })
      eventBusService.on('newMail', this.onLoad)
  }
  onLoad = ()=>{
    mailService.query().then(mails=>{
        this.setState({mails})
      })
  }
  componentWillUnmount(){
    eventBusService.on('newMail')
  }

  onMailOpen = (mail) => {
    const mailOpen = mail.id === this.state.mailOpen ? '' : mail.id;
    if(!mail.isRead)mailService.setMailRead(mail.id)
    mailService.query().then(mails=>{
        this.setState({mails,mailOpen})
      })
  };

  render() {
    const { mails, mailOpen } = this.state;
    if (!mails) return <h1>loading...</h1>;
    return (
      <section className="mail-list">
        {mails.map((mail) => (
          <MailPreview
            key={mail.id}
            mail={mail}
            mailOpen={mailOpen}
            onMailOpen={this.onMailOpen}
          />
        ))}
      </section>
    );
  }
}
