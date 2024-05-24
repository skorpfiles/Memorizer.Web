function StringLine(props){
    return props.item && props.text && (<>
        {props.item}
        {props.index < props.text.split('\n').length - 1 && <br />}
    </>);
}

export default StringLine;