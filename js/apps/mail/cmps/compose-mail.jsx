import { mailService } from '../services/mail.service.js';
import { eventBusService } from '../../../services/event-bus.service.js';

export function ComposeMail(props) {
  const goBack = () => {
    props.history.push(`/mail`);
  };

  const onAddMail = (ev) => {
    ev.preventDefault()
    
    const newMail = {
      subject: ev.target.subject.value,
      body: ev.target.body.value,
      isRead: true,
      sentAt: Date.now(),
      to: ev.target.to.value,
      isDraft: false,
    };
    console.log(newMail)
    mailService.addMail(newMail)
    eventBusService.emit('newMail')
    props.history.push(`/mail`);

  };

  return (
    <form className="compose-mail" onSubmit={onAddMail}>
      <div className="head">
        <span>New Message</span>
      </div>
      <div className="to">
        <input type="text" placeholder="Recipients" id="to" />
      </div>
      <div className="cc">
        <input type="text" placeholder="Cc" id="Cc" />
      </div>
      <div className="bcc">
        <input type="text" placeholder="Bcc" id="Bcc" />
      </div>
      <div className="subject">
        <input type="text" placeholder="Subject" id="subject" />
      </div>
      <div className="body">
        <textarea id="body" name="text-area" rows="4" cols="50"></textarea>
      </div>
      <div className="footer">
        <button>Send</button>
        <svg onClick={goBack} className="trash-icon" fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"/></svg>
      </div>
    </form>
  );
}
