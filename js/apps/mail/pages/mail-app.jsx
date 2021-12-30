import { mailService } from '../services/mail.service.js';
import { MailList } from '../cmps/mail-list.jsx';
import { MailNav } from '../cmps/mail-nav.jsx';
import { ComposeMail } from '../cmps/compose-mail.jsx';

const { Route } = ReactRouterDOM;

export class MailApp extends React.Component {
  state = {
    mails: null,
    filterBy: {
      mailType: '',
      isRead: '',
      search: '',
    },
  };

  componentDidMount() {
    this.loadMails();
  }

  loadMails = () => {
    mailService.query(this.state.filterBy).then((mails) => {
      this.setState({ mails });
    });
  };

  onChaingeFilterByType = (mailType) => {
    let filterBy = this.state.filterBy;
    filterBy.mailType = mailType;
    this.setState({ filterBy }, this.loadMails);
  };

  onDeleteMail = (mail) => {
    mailService.deleteMail(mail.id).then((mails) => {
      this.setState({ mails });
    });
  };

  render() {
    const { mails, filterBy } = this.state;
    if (!mails) return <h1>loading...</h1>; 
    return (
      <section className="mail-app">
        <Route component={ComposeMail} path={`/mail/compose/:noteId?`} />
        <MailNav mailType={filterBy.mailType} onChaingeFilterByType={this.onChaingeFilterByType} />
        <MailList mails={mails} onDeleteMail={this.onDeleteMail} />
      </section>
    );
  }
}
