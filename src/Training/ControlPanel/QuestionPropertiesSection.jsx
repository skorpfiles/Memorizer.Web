import Questionnaire from './QuestionPropertiesSection/Questionnaire';
import Stats from './QuestionPropertiesSection/Stats';
import styles from './QuestionPropertiesSection.module.css';
import { useSelector } from 'react-redux';
function QuestionPropertiesSection() {
    const questionnaireName = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].questionnaire.name);
    return (
        <div className={`font--default row ${styles['container']}`} >
            <div className={styles['questionnaire-container']}>
                <Questionnaire name={questionnaireName} />
            </div>
            <div className={styles['separator']} />
            <Stats/>
        </div>
    )
}

export default QuestionPropertiesSection;