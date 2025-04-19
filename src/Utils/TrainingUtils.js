export function getTitlesOfTrainingStagesOnQuestionType(questionType) {
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
        case 'untypedAndTypedAnswers':
            return [
                {
                    title: 'Learn',
                    trainingStages: ['learn'],
                    showForNew: true,
                    showForOld: false
                },
                {
                    title: 'Speak',
                    trainingStages: ['speak'],
                    showForNew: true,
                    showForOld: true
                },
                {
                    title: 'Write',
                    trainingStages: ['write'],
                    showForNew: true,
                    showForOld: true
                },
                {
                    title: 'Check',
                    trainingStages: ['check'],
                    showForNew: true,
                    showForOld: true
                }
            ]
        default:
            return [];
    }
}

export function getNextStateInTrainingQuestion(question, previousState) {
    let result;
    if (previousState === null) { //start training question
        if (question.myStatus.isNew) {
            result = {
                switchToNextQuestion: false,
                trainingStage: 'learn',
                trainingStageParameters: [],
                currentStageTimeIsLimited: true
            };
        }
        else {
            if (question.type !== 'untypedAndTypedAnswers') {
                result = {
                    switchToNextQuestion: false,
                    trainingStage: 'train',
                    trainingStageParameters: [],
                    currentStageTimeIsLimited: false
                }
            }
            else {
                result = {
                    switchToNextQuestion: false,
                    trainingStage: 'speak',
                    trainingStageParameters: [],
                    currentStageTimeIsLimited: false
                }
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
                            currentStageTimeIsLimited: false
                        }; break;
                    case 'train':
                    case 'trainAfterLearning':
                        result = {
                            switchToNextQuestion: true,
                            trainingStage: null,
                            trainingStageParameters: null,
                            currentStageTimeIsLimited: null
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
                            currentStageTimeIsLimited: false
                        }; break;
                    case 'train':
                        result = {
                            switchToNextQuestion: false,
                            trainingStage: 'check',
                            trainingStageParameters: previousState.trainingStageParameters,
                            currentStageTimeIsLimited: true
                        }; break;
                    case 'check':
                        result = {
                            switchToNextQuestion: true,
                            trainingStage: null,
                            trainingStageParameters: null,
                            currentStageTimeIsLimited: null
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
                            trainingStageParameters: previousState.trainingStageParameters,
                            currentStageTimeIsLimited: false
                        }; break;
                    case 'train':
                        result = {
                            switchToNextQuestion: false,
                            trainingStage: 'check',
                            trainingStageParameters: previousState.trainingStageParameters,
                            currentStageTimeIsLimited: true
                        }; break;
                    case 'check':
                        result = {
                            switchToNextQuestion: true,
                            trainingStage: null,
                            trainingStageParameters: null,
                            currentStageTimeIsLimited: null
                        }; break;
                    default: result = null; break;
                }; break;
            }
            case 'untypedAndTypedAnswers': {
                switch (previousState.trainingStage) {
                    case 'learn':
                        result = {
                            switchToNextQuestion: false,
                            trainingStage: 'speak',
                            trainingStageParameters: previousState.trainingStageParameters,
                            currentStageTimeIsLimited: false
                        }; break;
                    case 'speak':
                        result = {
                            switchToNextQuestion: false,
                            trainingStage: 'write',
                            trainingStageParameters: previousState.trainingStageParameters,
                            currentStageTimeIsLimited: false
                        }; break;
                    case 'write':
                        result = {
                            switchToNextQuestion: false,
                            trainingStage: 'check',
                            trainingStageParameters: previousState.trainingStageParameters,
                            currentStageTimeIsLimited: true
                        }; break;
                    case 'check':
                        result = {
                            switchToNextQuestion: true,
                            trainingStage: null,
                            trainingStageParameters: null,
                            currentStageTimeIsLimited: null
                        }; break;
                    default: result = null; break;
                }; break;
            }
            default: result = null; break;
        }
    }
    return result;
}

export function checkIfAnswerIsCorrect(trainingStage, question, givenTypedAnswers, isAnswerCorrectManual) {
    let isAnswerCorrectAutomatic = true;
    const newGivenTypedAnswers = [];
    if (question.type === 'typedAnswers' || (question.type === 'untypedAndTypedAnswers' && trainingStage === 'write')) {
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

export function getCurrentLoggedTimeOfTrainingQuestionMilliseconds(lastLoggedAnswerTimeMilliseconds, currentStageStartTime, currentStageTimeIsLimited, currentStageMaxTimeMilliseconds) {
    const currentStageTimeMilliseconds = Date.now() - currentStageStartTime;
    if (currentStageTimeIsLimited && currentStageMaxTimeMilliseconds) {
        if (currentStageTimeMilliseconds > currentStageMaxTimeMilliseconds) {
            return lastLoggedAnswerTimeMilliseconds + currentStageMaxTimeMilliseconds;
        } else {
            return lastLoggedAnswerTimeMilliseconds + currentStageTimeMilliseconds;
        }
    } else {
        return lastLoggedAnswerTimeMilliseconds + currentStageTimeMilliseconds;
    }
}