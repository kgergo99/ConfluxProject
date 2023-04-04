import './actionbutton.css'

function ActionButton(props){
    const icon = props.icon;
    
    const title = props.title
    const onClick = props.onClick;

    return (
        <div className='actionbutton-wrapper'>
            <button className='button-submit' title={title} onClick={onClick} style={ { background: `no-repeat center url(${icon})`, height:"100%"} }></button>
        </div>
    )
}

export default ActionButton