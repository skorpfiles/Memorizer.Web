import styles from './SectionElement.module.css';

function SectionElement(props) {
    return (
        <button className={`main-flex-wrap-label font--main-for-controls ${styles['section-element']}`} onClick={props.handleSectionElementClick}>{props.children}</button>
    );
}

export default SectionElement;