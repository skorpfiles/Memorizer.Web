import NewQuestionSignal from './QuestionStageSection/NewQuestionSignal';
import Stage from './QuestionStageSection/Stage';
import styles from './QuestionStageSection.module.css';

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

function getTitlesOfTrainingStagesOnQuestionType(questionType) {
    switch (questionType) {
        case 'task':
            return [
                {
                    title: 'Learn',
                    trainingStages: ['learn'],
                    showForNew: true,
                    showForOld: false
                },
                {
                    title: 'Train',
                    trainingStages: ['train', 'trainAfterLearning'],
                    showForNew: true,
                    showForOld: true
                }
            ];
        case 'untypedAnswer':
        case 'typedAnswers':
        case 'untypedAndTypedAnswers':
            return [
                {
                    title: 'Learn',
                    trainingStages: ['learn'],
                    showForNew: true,
                    showForOld: false
                },
                {
                    title: 'Train',
                    trainingStages: ['train', 'trainAfterLearning'],
                    showForNew: true,
                    showForOld: true
                },
                {
                    title: 'Check',
                    trainingStages: ['check'],
                    showForNew: true,
                    showForOld: true
                }
            ];
        default:
            return [];
    }
}

export default QuestionStageSection;