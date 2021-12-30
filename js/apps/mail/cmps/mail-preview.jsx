
import { GetDateFormat } from './mail-preview/sentAt-preview.jsx';

export function MailPreview({ mail, mailOpen, onMailOpen }) {
  const isOpen = mailOpen === mail.id;
  const senderName = mail.from.slice(0,mail.from.indexOf('@'))
  const classRead = mail.isRead? '': 'unread'
    // const mailContent = mail.body.slice(0,50);
  return (
    <React.Fragment>
      <section className={`mail-preview ${classRead}`} onClick={() => onMailOpen(mail)}>
        <h2>{senderName}</h2>
        <div><h2>{mail.subject} - </h2><span>{mail.body}</span></div>
        <GetDateFormat sentAt={mail.sentAt} />
      </section>
      {isOpen && (
        <section className="mail-details">
          <h1>{mail.subject}</h1>
          <h2>{senderName}  {mail.from}</h2>
          <p>{mail.body}</p>
        </section>
      )}
    </React.Fragment>
  );
}
