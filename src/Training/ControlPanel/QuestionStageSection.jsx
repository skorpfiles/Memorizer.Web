import NewQuestionSignal from './QuestionStageSection/NewQuestionSignal';
import Stage from './QuestionStageSection/Stage';
import styles from './QuestionStageSection.module.css';
import { getTitlesOfTrainingStagesOnQuestionType } from '../../Utils/TrainingUtils';
import { useSelector } from 'react-redux';

function QuestionStageSection() {
    const trainingStage = useSelector(state => state.trainingState.trainingStage);
    const isQuestionNew = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].myStatus.isNew);
    const questionType = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].type);

    const trainingStagesInfoForShowing = getTitlesOfTrainingStagesOnQuestionType(questionType);
    const trainingStagesInfoForCurrentNewStatus = isQuestionNew
        ? trainingStagesInfoForShowing.filter(element => element.showForNew)
        : trainingStagesInfoForShowing.filter(element => element.showForOld);

    return (
        <div className={`row ${styles['content']}`}>
            {isQuestionNew && (<NewQuestionSignal />)}
            {trainingStagesInfoForCurrentNewStatus.map(element => (
                <Stage key={element.title} name={element.title} isActive={element.trainingStages.includes(trainingStage)}/>
            ))}
        </div>
    )
}

export default QuestionStageSection;