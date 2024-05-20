export function getNextStateInTrainingQuestion(question, previousState) {
    let result;
    if (previousState === null) { //start training question
        if (question.myStatus.isNew) {
            result = {
                switchToNextQuestion: false,
                trainingStage: 'learn',
                trainingStageParameters: [],
                startTrainingTimer: false,
                stopTrainingTimer: false
            };
        }
        else {
            result = {
                switchToNextQuestion: false,
                trainingStage: 'train',
                trainingStageParameters: [],
                startTrainingTimer: true,
                stopTrainingTimer: false
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
                            trainingStageParameters: previousState.trainingStageParameters,
                            startTrainingTimer: true,
                            stopTrainingTimer: false
                        }; break;
                    case 'train': case 'trainAfterLearning':
                        result = {
                            switchToNextQuestion: true,
                            trainingStage: null,
                            trainingStageParameters: null,
                            startTrainingTimer: false,
                            stopTrainingTimer: true
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
                            trainingStageParameters: previousState.trainingStageParameters,
                            startTrainingTimer: true,
                            stopTrainingTimer: false
                        }; break;
                    case 'train':
                        result = {
                            switchToNextQuestion: false,
                            trainingStage: 'check',
                            trainingStageParameters: previousState.trainingStageParameters,
                            startTrainingTimer: false,
                            stopTrainingTimer: true
                        }; break;
                    case 'check':
                        result = {
                            switchToNextQuestion: true,
                            trainingStage: null,
                            trainingStageParameters: null,
                            startTrainingTimer: false,
                            stopTrainingTimer: false
                        }; break;
                    default: result = null; break;
                }; break;
            }
            case 'typedAnswers': case 'untypedAndTypedAnswers': {
                switch (previousState.trainingStage) {
                    case 'learn':
                        result = {
                            switchToNextQuestion: false,
                            trainingStage: 'train',
                            trainingStageParameters: previousState.trainingStageParameters,
                            startTrainingTimer: true,
                            stopTrainingTimer: false
                        }; break;
                    case 'train':
                        result = {
                            switchToNextQuestion: false,
                            trainingStage: 'check',
                            trainingStageParameters: previousState.trainingStageParameters,
                            startTrainingTimer: false,
                            stopTrainingTimer: true
                        }; break;
                    case 'check':
                        result = {
                            switchToNextQuestion: true,
                            trainingStage: null,
                            trainingStageParameters: null,
                            startTrainingTimer: false,
                            stopTrainingTimer: false
                        }; break;
                    default: result = null; break;
                }; break;
            }
            default: result = null; break;
        }
    }
    return result;
}

export function checkIfAnswerIsCorrect(question, givenTypedAnswers, isAnswerCorrectManual) {
    let isAnswerCorrectAutomatic = true;
    const newGivenTypedAnswers = [];
    if (question.type === 'typedAnswers' || question.type === 'untypedAndTypedAnswers') {
        const correctAnswersTexts = question.typedAnswers.map(ans => ans.text);
        let appliedAnswersTexts = [];
        for (let i = 0; i < givenTypedAnswers.length; i++) {
            if (correctAnswersTexts.includes(givenTypedAnswers[i]) && !appliedAnswersTexts.includes(givenTypedAnswers[i])) {
                newGivenTypedAnswers.push({
                    text: givenTypedAnswers[i],
                    isCorrect: true
                });
                appliedAnswersTexts.push(givenTypedAnswers[i]);
            }
            else {
                newGivenTypedAnswers.push({
                    text: givenTypedAnswers[i],
                    isCorrect: false
                });
                isAnswerCorrectAutomatic = false;
            }
        }
    }

    if (isAnswerCorrectManual !== null) {
        isAnswerCorrectAutomatic = isAnswerCorrectManual;
    }

    return ({
        isCorrect: isAnswerCorrectAutomatic,
        givenTypedAnswers: newGivenTypedAnswers
    });
}

export function getCorrectAnswersPercent(questions) {
    const numberOfQuestions = questions.length;
    const numberOfCorrectAnswers = questions.filter(question => question.isAnswerCorrect).length;

    return numberOfCorrectAnswers / numberOfQuestions * 100;
}