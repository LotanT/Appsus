
import { GetDateFormat } from './mail-preview/sentAt-preview.jsx';

export function MailPreview({ mail, mailOpen, onMailOpen }) {
  const isOpen = mailOpen === mail.id;
  const senderName = mail.from.slice(0,mail.from.indexOf('@'))
  const classRead = mail.isRead? '': 'unread'

  return (
    <React.Fragment>
      <section className={`mail-preview ${classRead}`} onClick={() => onMailOpen(mail)}>
        <h2>{senderName}</h2>
        <h2>{mail.subject}</h2>
        <h2>{mail.body}</h2>
        <GetDateFormat sentAt={mail.sentAt} />
      </section>
      {isOpen && (
        <section className="mail-details">
          <h1>{mail.subject}</h1>
          <h3>{senderName}  {mail.from}</h3>
          <p>{mail.body}</p>
        </section>
      )}
    </React.Fragment>
  );
}
