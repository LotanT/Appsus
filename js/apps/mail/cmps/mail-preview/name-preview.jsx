export function NamePreview({sentFrom}){
    const userName = sentFrom.slice(0,sentFrom.indexOf('@'))
    return (<h1>{userName}</h1>)
}