export function goNextInTrainingQuestion(question, previousState, parameters) {
    let result;
    if (previousState === null) { //start training question
        if (question.myStatus.isNew) {
            result = {
                switchToNextQuestion: false,
                trainingStage: 'learn',
                trainingStageParameters: []
            };
        }
        else {
            result = {
                switchToNextQuestion: false,
                trainingStage: 'train',
                trainingStageParameters: []
            }
        }
    }
    else {
        switch (question.type) {
            case 'task': {
                switch (previousState.trainingStage) {
                    case 'learn':
                        result = {
                            switchToNextQuestion: false,
                            trainingStage: 'trainAfterLearning',
                            trainingStageParameters: []
                        }; break;
                    case 'train': case 'trainAfterLearning':
                        result = {
                            switchToNextQuestion: true,
                            trainingStage: null,
                            trainingStageParameters: null
                        }; break;
                    default: result = null; break;
                }; break;
            }
            case 'untypedAnswer': {
                switch (previousState.trainingStage) {
                    case 'learn':
                        result = {
                            switchToNextQuestion: false,
                            trainingStage: 'train',
                            trainingStageParameters: []
                        }; break;
                    case 'train':
                        result = {
                            switchToNextQuestion: false,
                            trainingStage: 'check',
                            trainingStageParameters: []
                        }; break;
                    case 'check':
                        result = {
                            switchToNextQuestion: true,
                            trainingStage: null,
                            trainingStageParameters: null
                        }; break;
                    default: result = null; break;
                }; break;
            }
            case 'typedAnswers': {
                switch (previousState.trainingStage) {
                    case 'learn':
                        result = {
                            switchToNextQuestion: false,
                            trainingStage: 'train',
                            trainingStageParameters: []
                        }; break;
                    case 'train':
                        result = {
                            switchToNextQuestion: false,
                            trainingStage: 'check',
                            trainingStageParameters: [...parameters]
                        }; break;
                    case 'check':
                        result = {
                            switchToNextQuestion: true,
                            trainingStage: null,
                            trainingStageParameters: null
                        }; break;
                    default: result = null; break;
                }; break;
            }
            default: result = null; break;
        }
    }
    return result;
}