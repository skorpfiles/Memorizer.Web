function SectionElement(props) {
    return (
        <div className="MainFlexWrapLabel" style={{ position: "relative", margin: "0 0.35em"}}>{props.children}</div>
    );
}

export default SectionElement;