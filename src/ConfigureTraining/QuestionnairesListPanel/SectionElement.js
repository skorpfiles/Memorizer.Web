import './SectionElement.css';

function SectionElement(props) {
    return (
        <div className="MainFlexWrapLabel QuestionnairesListPanelSectionElement">{props.children}</div>
    );
}

export default SectionElement;