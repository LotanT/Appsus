import { mailService } from '../services/mail.service.js';
import { MailList } from '../cmps/mail-list.jsx';
import { MailNav } from '../cmps/mail-nav.jsx';
import { ComposeMail } from '../cmps/compose-mail.jsx';
import { MailFullScreen } from '../cmps/mail-full-screen.jsx';
import { eventBusService } from '../../../services/event-bus.service.js';

const { Route } = ReactRouterDOM;

export class MailApp extends React.Component {
  state = {
    fullMails: null,
    mails: null,
    sortBy: '',
    filterBy: {
      mailType: '',
      isRead: '',
      search: '',
    },
  };

  componentDidMount() {
    this.loadMails();
    eventBusService.on('delete-mail', this.onDeleteMail);
    eventBusService.on('search-mail', this.setFilterBySearch);
    eventBusService.on('new-mail', this.loadMails);
  }
  
  componentWillUnmount() {
    eventBusService.on('delete-mail', this.onDeleteMail);
    eventBusService.on('search-mail', this.setFilterBySearch);
    eventBusService.on('new-mail', this.loadMails);
  }

  loadMails = () => {
    mailService.query(this.state.filterBy,this.state.sortBy).then((mails) => {
      this.setState({ mails: mails.filteredMails, fullMails: mails.mails });
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

  onFilterByRead = ({ target }) => {
    let filterBy = this.state.filterBy;
    filterBy.isRead = target.value;
    this.setState({ filterBy }, this.loadMails);
  };

  onSortBy = ({target}) =>{
    const sortBy = target.value;
    this.setState({ sortBy }, this.loadMails);
  }

  setFilterBySearch = (searchTxt) =>{
    let filterBy = this.state.filterBy;
    filterBy.search = searchTxt;
    this.setState({ filterBy }, this.loadMails);
  }

  onMarkMailRead = (mail) => {
    mailService.setMailRead(mail.id);
    this.loadMails();
  };

  getUnreadcount = () => {
    return this.state.fullMails.filter((mail) => !mail.isRead).length;
  };

  onToggleReadUnread = (mail) => {
    mailService.toggleReadUnread(mail.id);
    this.loadMails();
  };

  render() {
    const { mails, filterBy } = this.state;
    if (!mails) return <h1>loading...</h1>;
    const unReadCount = this.getUnreadcount();
    return (
      <section className="mail-app">
        <Route component={ComposeMail} path={`/mail/compose/:noteId?`} />
        <Route component={MailFullScreen} path={`/mail/:mailId`} />
        <MailNav
          mailType={filterBy.mailType}
          onChaingeFilterByType={this.onChaingeFilterByType}
          unReadCount={unReadCount}
        />
        <MailList
          mails={mails}
          onDeleteMail={this.onDeleteMail}
          onFilterByRead={this.onFilterByRead}
          onMarkMailRead={this.onMarkMailRead}
          onToggleReadUnread={this.onToggleReadUnread}
          onSortBy={this.onSortBy}
        />
      </section>
    );
  }
}
