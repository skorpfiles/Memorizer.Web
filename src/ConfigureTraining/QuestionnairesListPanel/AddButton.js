import SectionElement from './SectionElement';
import AddIcon from './add.png';

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