import { useState } from 'react';
import QASpace from '../../Training/QASpace';
import ResponseSpace from '../../Training/ResponseSpace';
import ControlPanel from '../../Training/ControlPanel';

import { useSelector } from 'react-redux';


function TrainingPage() {
    //const [testTrainingState, setTestTrainingState] = useState({
    //    questionType: 'task',
    //    trainingStage: 'train',
    //    typedAnswersCheckResultMode: 'correct'
    //});

    const currentQuestion = useSelector(state => state.trainingState.currentQuestion);
    const trainingStage = useSelector(state => state.trainingState.trainingStage);
    const trainingStageParameters = useSelector(state => state.trainingState.trainingStageParameters);

    let typedAnswersCheckResultMode;
    if (trainingStage === 'typedAnswers') {
        typedAnswersCheckResultMode = trainingStageParameters[0];
    }
    else {
        typedAnswersCheckResultMode = null;
    }

    return (
        <div className='flex-all-free-space column'>
            <QASpace
                questionType={currentQuestion.type}
                trainingStage={trainingStage}
                typedAnswersCheckResultMode={typedAnswersCheckResultMode}
            />
            <ResponseSpace
                questionType={currentQuestion.type}
                trainingStage={trainingStage}
                typedAnswersCheckResultMode={typedAnswersCheckResultMode}
            />
            <ControlPanel
                trainingStage={trainingStage}
            />
        </div>
    )
}

export default TrainingPage;