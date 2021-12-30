import { MailPreview } from './mail-preview.jsx';
import { mailService } from '../services/mail.service.js';
import { eventBusService } from '../../../services/event-bus.service.js';

export function MailList({mails},onDeleteMail) {
  // componentDidMount() {
  //   mailService.query().then(mails=>{
  //       this.setState({mails})
  //     })
  //     eventBusService.on('newMail', this.onLoad)
  // }
  // onLoad = ()=>{
  //   mailService.query().then(mails=>{
  //       this.setState({mails})
  //     })
  // }
  // componentWillUnmount(){
  //   eventBusService.on('newMail')
  // }
  return (
    <section className="mail-list">
      {mails.map((mail) => (
        <MailPreview
          key={mail.id}
          mail={mail}
          onDeleteMail={onDeleteMail}
        />
      ))}
    </section>
  );
}
