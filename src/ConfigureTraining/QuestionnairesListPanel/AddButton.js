import SectionElement from './SectionElement';
import AddIcon from './add.png';

function AddButton(props) {
    return (
        <SectionElement>
            <div className="Font-Bold" onClick={props.onClick}>
                +
            </div>
        </SectionElement>
    )
}

export default AddButton;