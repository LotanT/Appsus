import { ComposeMail } from './compose-mail.jsx';


const {Link, Route} = ReactRouterDOM;

export function MailNav(){
    return(
        <section className="mail-nav">
            <Link to="/mail/compose"><button>compose</button></Link>
            <Route component={ComposeMail} path={`/mail/compose`} />
            <div>inbox</div>
            <div>Strred</div>
            <div>Sent</div>
            <div>Draft</div>
        </section>
    )
}