import { MailPreview } from './mail-preview.jsx';
// import { mailService } from '../services/mail.service.js';
// import { eventBusService } from '../../../services/event-bus.service.js';

export function MailList({mails,onDeleteMail,onFilterByRead,onMarkMailRead,onToggleReadUnread,onSortBy,onToggleStarred}) {
  

  
  return (
    <section className="mails-container">
    <section className="tool-bar">
      <select onChange={onFilterByRead} name="read/unread">
        <option value="">Read/Unread</option>
        <option value="read">Read</option>
        <option value="unread">Unread</option>
      </select>
      <select  onChange={onSortBy} name="sort-by">
        <option value="">Sort by</option>
        <option value="title">Title</option>
        {/* <option value="subject">Subject</option> */}
        <option value="date">Date</option>
      </select>
    </section>
    <section className="mail-list">
      {mails.map((mail) => (
        <MailPreview
          key={mail.id}
          mail={mail}
          onDeleteMail={onDeleteMail}
          onMarkMailRead={onMarkMailRead}
          onToggleReadUnread={onToggleReadUnread}
          onToggleStarred={onToggleStarred}
        />
      ))}
    </section>
    </section>
  );
}
