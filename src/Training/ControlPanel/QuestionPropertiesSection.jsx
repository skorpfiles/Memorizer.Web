import Questionnaire from './QuestionPropertiesSection/Questionnaire';
import Stats from './QuestionPropertiesSection/Stats';
function QuestionPropertiesSection() {
    return (
        <div style={{"display":"flex","flexDirection":"row"}} >
            <Questionnaire />
            <Stats/>
        </div>
    )
}

export default QuestionPropertiesSection;