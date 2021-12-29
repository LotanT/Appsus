import { MailPreview } from './mail-preview.jsx';

export class MailList extends React.Component {
  state = {
    mails: null,
    mailOpen: null,
  };

  componentDidMount() {
    this.setState({ mails: this.props.mails });
  }

  onMailOpen = (mail) => {
    const mailOpen = mail.id === this.state.mailOpen ? '' : mail.id;
    this.setState({ mailOpen: mailOpen });
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
