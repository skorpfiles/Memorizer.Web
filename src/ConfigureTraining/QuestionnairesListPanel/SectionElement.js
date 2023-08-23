import './SectionElement.css';

function SectionElement(props) {
    return (
        <div className="MainFlexWrapLabel QuestionnairesListPanelSectionElement" onClick={props.handleSectionElementClick}>{props.children}</div>
    );
}

export default SectionElement;