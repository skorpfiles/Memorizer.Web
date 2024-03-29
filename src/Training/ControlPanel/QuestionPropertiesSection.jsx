import Questionnaire from './QuestionPropertiesSection/Questionnaire';
import Stats from './QuestionPropertiesSection/Stats';
import styles from './QuestionPropertiesSection.module.css';
function QuestionPropertiesSection() {
    return (
        <div className={`font--default ${styles['content']}`} style={{"display":"flex", "flexDirection":"row"}} >
            <Questionnaire name="Piano Exercises Piano Exercises Piano Exercises Piano Exercises Piano Exercises " />
            <div className={styles['separator']} />
            <Stats/>
        </div>
    )
}

export default QuestionPropertiesSection;