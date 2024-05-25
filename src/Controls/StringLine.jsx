function StringLine(props){
    return props.text && (<>
        {props.item ?? ''}
        {props.index < props.text.split('\n').length - 1 && <br />}
    </>);
}

export default StringLine;