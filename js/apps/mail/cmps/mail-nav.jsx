

const { Link } = ReactRouterDOM;

export function MailNav({onChaingeFilterByType}) {
  return (
    <section className="mail-nav">
      <Link to="/mail/compose">
        <button>compose</button>
      </Link>
      
      <div onClick={()=>onChaingeFilterByType('inbox')}>inbox</div>
      <div onClick={()=>onChaingeFilterByType('starred')}>Starred</div>
      <div onClick={()=>onChaingeFilterByType('sent')}>Sent</div>
      <div onClick={()=>onChaingeFilterByType('draft')}>Draft</div>
    </section>
  );
}
