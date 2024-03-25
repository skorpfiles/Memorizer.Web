import Questionnaire from './QuestionPropertiesSection/Questionnaire';
import Stats from './QuestionPropertiesSection/Stats';
function QuestionPropertiesSection() {
    return (
        <div className='font--default' style={{"display":"flex","flexDirection":"row", "padding":"0.25rem 0.2rem"}} >
            <Questionnaire name="Piano Exercises" />
            <Stats/>
        </div>
    )
}

export default QuestionPropertiesSection;