import { NamePreview } from './mail-preview/name-preview.jsx';
import { GetDateFormat } from './mail-preview/sentAt-preview.jsx';



export function MailPreview ({mail}){ 
    return(
        <section className="mail-preview">
            <NamePreview sentFrom={mail.from}/>
            <h2>{mail.subject}</h2>
            <h2>{mail.body}</h2>
            <GetDateFormat sentAt={mail.sentAt}/>
        </section>
    )
}