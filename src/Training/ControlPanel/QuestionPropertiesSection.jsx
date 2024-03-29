import Questionnaire from './QuestionPropertiesSection/Questionnaire';
import Stats from './QuestionPropertiesSection/Stats';
import styles from './QuestionPropertiesSection.module.css';
function QuestionPropertiesSection() {
    return (
        <div className={`font--default row ${styles['container']}`} >
            <div className={styles['questionnaire-container']}>
                <Questionnaire name="Piano Exercises Piano Exercises Piano Exercises Piano Exercises Piano Exercises " />
            </div>
            <div className={styles['separator']} />
            <Stats/>
        </div>
    )
}

export default QuestionPropertiesSection;