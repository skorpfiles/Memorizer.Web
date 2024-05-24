import StringLine from './StringLine';
function MultilineText(props) {
    return props.text && (
        <>
            {props.text.split('\n').map((item, index) => (
                <StringLine text={props.text} item={item} index={index} key={index} />
            ))}
        </>
    );
}

export default MultilineText;