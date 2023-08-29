import SectionElement from './SectionElement';

function AddButton(props) {
    return (
        <SectionElement handleSectionElementClick={props.onClick}>
            <div className="Font-Bold">
                +
            </div>
        </SectionElement>
    )
}

export default AddButton;