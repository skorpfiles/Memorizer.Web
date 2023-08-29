import SectionElement from './SectionElement';

function AddButton(props) {
    return (
        <SectionElement handleSectionElementClick={props.onClick}>
            <div className="font--bold">
                +
            </div>
        </SectionElement>
    )
}

export default AddButton;