

const { Link } = ReactRouterDOM;

export function MailNav({mailType,onChaingeFilterByType,unReadCount}) {
  let inbox = ""
  let starred= ""
  let sent= ""
  let draft= ""
  switch (mailType) {
    case 'inbox':
      inbox = 'active'
      break;
    case 'starred':
      starred = 'active'
      break;
    case 'sent':
      sent = 'active'
      break;
    case 'draft':
      draft = 'active'
      break;
  }
  
  return (
    <section className="mail-nav">
      <Link to="/mail/compose/">
        <img src="https://www.gstatic.com/images/icons/material/colored_icons/1x/create_32dp.png"/><span>compose</span>
      </Link>
      
      <div className={`inbox ${inbox}`} onClick={()=>onChaingeFilterByType('inbox')}><span>inbox</span><span>{`${unReadCount}`}</span> </div>
      <div className={starred} onClick={()=>onChaingeFilterByType('starred')}>Starred</div>
      <div className={sent} onClick={()=>onChaingeFilterByType('sent')}>Sent</div>
      <div className={draft} onClick={()=>onChaingeFilterByType('draft')}>Draft</div>
    </section>
  );
}
