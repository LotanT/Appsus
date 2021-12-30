import { GetDateFormat } from './mail-preview/sentAt-preview.jsx';
import { mailService } from '../services/mail.service.js';

export class MailPreview extends React.Component {
  state = {
    isOpen: false,
  };
  componentDidMount() {
  }
  // const mailContent = mail.body.slice(0,50);
  onMailOpen = () => {
    const mail = this.props.mail
    if (!mail.isRead) {
      mailService.setMailRead(mail.id);
      mail.isRead = true;
    }
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const mail = this.props.mail;
    const isOpen = this.state.isOpen;
    if (!mail) return <h1>loading..</h1>;
    const senderName = this.props.mail.from.slice(0, mail.from.indexOf('@'));
    const classRead = mail.isRead ? '' : 'unread';
    return (
      <React.Fragment>
        <section
          className={`mail-preview ${classRead}`}
          onClick={() => this.onMailOpen()}
        >
          <h2>{senderName}</h2>
          <div>
            <h2>{mail.subject} - </h2>
            <span>{mail.body}</span>
          </div>
          <GetDateFormat sentAt={mail.sentAt} />
        </section>
        {isOpen && (
          <section className="mail-details">
            <h1>{mail.subject}</h1>
            <h2>
              {senderName}  {mail.from}
            </h2>
            <p>{mail.body}</p>
            <svg
              onClick={() => onDeleteMail(mail)}
              className="trash-icon"
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24px"
              height="24px"
            >
              <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" />
            </svg>
          </section>
        )}
      </React.Fragment>
    );
  }
}
