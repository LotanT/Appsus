import { mailService } from '../services/mail.service.js';
import { eventBusService } from '../../../services/event-bus.service.js';
import { notesService } from '../../keep/services/note.service.js';
import { utilService } from '../../../services/util.service.js';

export class ComposeMail extends React.Component {
  state = {
    subject: '',
    body: '',
    to: '',
    cc: '',
    bcc: '',
  };

  saveInterval = 0;

  goBack = () => {
    this.props.history.push(`/mail`);
  };

  componentDidMount() {
    if (this.props.match.params.noteId) {
      notesService.getNoteById(this.props.match.params.noteId).then((note) => {
        console.log(note);
        const subject = note.info.title
        let body = ''
        if(note.type === 'note-txt') body = note.info.txt
        else if(note.type === 'note-todos'){
          body = note.info.todos.map((todo,idx)=>`${idx+1}. ${todo.txt}   `).join('')
        } 
        this.setState({subject,body})
      });
    }
    this.saveInterval = setInterval(this.onSentMail,10000,null,true)
  }
  componentWillUnmount(){
    clearInterval(this.saveInterval)
  }
  onSentMail = (ev,isDraft = false) => {
    if(ev) ev.preventDefault();
    const newMail = {
      subject: this.state.subject,
      body: this.state.body,
      isRead: true,
      sentAt: Date.now(),
      to: this.state.to,
      cc: this.state.cc,
      bcc: this.state.bcc,
      isDraft: isDraft,
    };
    mailService.sentMail(newMail);
    eventBusService.emit('new-mail');
    if(!isDraft) this.props.history.push(`/mail`);
  };

  setBody = (ev) =>{
    this.setState({body: ev.target.value})
  }
  setSubject = (ev) =>{
    this.setState({subject: ev.target.value})
  }
  setTo = (ev) =>{
    this.setState({to: ev.target.value})
  }
  setCc = (ev) =>{
    this.setState({cc: ev.target.value})
  }
  setBcc = (ev) =>{
    this.setState({bcc: ev.target.value})
  }
  
 

  render() {
    
    return (
      <form className="compose-mail" onSubmit={this.onSentMail}>
        <div className="head">
          <span>New Message</span>
        </div>
        <div className="to">
          <input type="text" onChange={this.setTo} placeholder="Recipients" id="to" />
        </div>
        <div className="cc">
          <input type="text" onChange={this.setCc} placeholder="Cc" id="cc" />
        </div>
        <div className="bcc">
          <input type="text" onChange={this.setBcc} placeholder="Bcc" id="bcc" />
        </div>
        <div className="subject">
          <input type="text" placeholder="Subject" onChange={this.setTo} id="subject" defaultValue={this.state.subject} />
        </div>
        <div className="body">
          <textarea id="body" name="text-area" onChange={this.setBody} rows="4" cols="50" value={this.state.body}></textarea>
        </div>
        <div className="footer">
          <button>Send</button>
          <svg
            onClick={this.goBack}
            className="trash-icon"
            fill="#000000"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24px"
            height="24px"
          >
            <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" />
          </svg>
        </div>
      </form>
    );
  }
}
