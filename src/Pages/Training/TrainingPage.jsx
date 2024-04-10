import { useState } from 'react';
import QASpace from '../../Training/QASpace';
import ResponseSpace from '../../Training/ResponseSpace';
import ControlPanel from '../../Training/ControlPanel';
function TrainingPage() {
    const [testTrainingState, setTestTrainingState] = useState({
        questionType: 'typedAnswers',
        trainingStage: 'train',
        typedAnswersCheckResultMode: 'correct'
    });

    return (
        <div className='flex-all-free-space column'>
            <QASpace
                questionType={testTrainingState.questionType}
                trainingStage={testTrainingState.trainingStage}
                typedAnswersCheckResultMode={testTrainingState.typedAnswersCheckResultMode} />
            <ResponseSpace
                questionType={testTrainingState.questionType}
                trainingStage={testTrainingState.trainingStage}
                typedAnswersCheckResultMode={testTrainingState.typedAnswersCheckResultMode}
            />
            <ControlPanel
                questionType={testTrainingState.questionType}
                trainingStage={testTrainingState.trainingStage} />
        </div>
    )
}

export default TrainingPage;