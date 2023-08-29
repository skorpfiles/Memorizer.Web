import styles from './SectionElement.module.css';

function SectionElement(props) {
    return (
        <div className={`main-flex-wrap-label ${styles['section-element']}`} onClick={props.handleSectionElementClick}>{props.children}</div>
    );
}

export default SectionElement;