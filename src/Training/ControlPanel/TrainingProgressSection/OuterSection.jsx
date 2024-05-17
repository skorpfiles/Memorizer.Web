import styles from './OuterSection.module.css';
function OuterSection(props) {
    let borderStyle;
    switch (props.position) {
        case 'left': borderStyle = styles['border-style-for-left-section']; break;
        case 'right': borderStyle = styles['border-style-for-right-section']; break;
        default: borderStyle = null; break;
    }

    return (
        <div className={`font--bold display-flex ${styles['outer-container']} ${borderStyle}`}>
            <div className={`row ${styles['inner-container']}`}>
                <img src={props.icon} width='20rem' alt={props.iconAlt} title={props.iconTitle} />
                <div className={`flex-all-free-space ${styles['text']}` }>{props.children}</div>
            </div>
        </div>
    )
}

export default OuterSection;