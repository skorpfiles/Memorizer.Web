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

export function challengeIncorrectness(question, trainingStage, trainingStageParameters) {
    let resultTrainingStageParameters = trainingStageParameters;
    if (question.type === 'typedAnswers' && trainingStage === 'check' && trainingStageParameters[0] === 'incorrect') {
        resultTrainingStageParameters[0] = 'correct';
    }
    return {
        trainingStageParameters: resultTrainingStageParameters
    };
}

export function checkIfAnswerIsCorrect(question, givenTypedAnswers, isAnswerCorrectManual) {
    let isAnswerCorrectAutomatic = true;
    const newGivenTypedAnswers = [];
    if (question.type === 'typedAnswers') {
        const correctAnswersTexts = question.typedAnswers.map(ans => ans.text);
        let appliedAnswersTexts = [];
        for (let i = 0; i < givenTypedAnswers; i++) {
            if (correctAnswersTexts.includes(givenTypedAnswers[i].text) && !appliedAnswersTexts.includes(givenTypedAnswers[i].text)) {
                newGivenTypedAnswers.push({
                    text: givenTypedAnswers.text,
                    isCorrect: true
                });
                appliedAnswersTexts.push(givenTypedAnswers[i].text);
            }
            else {
                newGivenTypedAnswers.push({
                    text: givenTypedAnswers.text,
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
    const questionsWithAnswers = questions.filter(question => question.gotAnswer === true);
    const numberOfQuestionsWithAnswers = questionsWithAnswers.length;
    const numberOfCorrectAnswers = questionsWithAnswers.filter(question => question.isAnswerCorrect).length;

    return numberOfCorrectAnswers / numberOfQuestionsWithAnswers * 100;
}