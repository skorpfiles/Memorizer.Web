export const DEMO_QUESTIONS_MODE = true;
export function GetTrainingQuestionsForEveryType() {
    const standardQuestionData = {
        questionnaire: {
            id: 'fakeQuestionnaireId1',
            code: 1,
            name: 'Fake Questionnaire',
            ownerId: 'fakeOwnerId',
            ownerName: 'Fake Owner'
        },
        enabled: true,
        reference: 'Test data.',
        estimatedTrainingTimeSeconds: 5
    };

    const newStatus = {
        isNew: true,
        rating: 50,
        penaltyPoints: 0
    };

    const oldStatus = {
        isNew: false,
        rating: 44,
        penaltyPoints: 0
    };

    const penaltyPointsStatus = {
        isNew: false,
        rating: 50,
        penaltyPoints: 6
    };

    return {
        name: 'Test Training',
        questions:
            [
                {
                    id: 'newTaskQuestion',
                    codeInQuestionnaire: 1,
                    type: 'task',
                    text: 'New Task Description.',
                    untypedAnswer: null,
                    typedAnswers: [],
                    myStatus: newStatus,
                    ...standardQuestionData
                },
                {
                    id: 'oldTaskQuestion',
                    codeInQuestionnaire: 2,
                    type: 'task',
                    text: 'Old Task Description.',
                    untypedAnswer: null,
                    typedAnswers: [],
                    myStatus: oldStatus,
                    ...standardQuestionData
                },
                {
                    id: 'taskQuestionWithPenaltyPoints',
                    codeInQuestionnaire: 3,
                    type: 'task',
                    text: 'Task With Penalty Points Description.',
                    untypedAnswer: null,
                    typedAnswers: [],
                    myStatus: penaltyPointsStatus,
                    ...standardQuestionData
                },
                {
                    id: 'newUntypedAnswerQuestion',
                    codeInQuestionnaire: 4,
                    type: 'untypedAnswer',
                    text: 'New Question With Untyped Answer Description.',
                    untypedAnswer: 'Untyped Answer Text',
                    typedAnswers: [],
                    myStatus: newStatus,
                    ...standardQuestionData
                },
                {
                    id: 'oldUntypedAnswerQuestion',
                    codeInQuestionnaire: 5,
                    type: 'untypedAnswer',
                    text: 'Old Question With Untyped Answer Description.',
                    untypedAnswer: 'Untyped Answer Text',
                    typedAnswers: [],
                    myStatus: oldStatus,
                    ...standardQuestionData
                },
                {
                    id: 'untypedAnswerQuestionWithPenaltyPoints',
                    codeInQuestionnaire: 6,
                    type: 'untypedAnswer',
                    text: 'Question With Untyped Answer And Penalty Points Description.',
                    untypedAnswer: 'Untyped Answer Text',
                    typedAnswers: [],
                    myStatus: penaltyPointsStatus,
                    ...standardQuestionData
                },
                {
                    id: 'newTypedAnswersQuestion',
                    codeInQuestionnaire: 7,
                    type: 'typedAnswers',
                    text: 'New Question With Typed Answers Description. Correct answers: memory, happiness',
                    untypedAnswer: null,
                    typedAnswers: [
                        {
                            id: 'typedAnswer1ForQuestion7',
                            text: 'memory'
                        },
                        {
                            id: 'typedAnswer2ForQuestion7',
                            text: 'happiness'
                        },
                    ],
                    myStatus: newStatus,
                    ...standardQuestionData
                },
                {
                    id: 'oldTypedAnswersQuestion',
                    codeInQuestionnaire: 8,
                    type: 'typedAnswers',
                    text: 'Old Question With Typed Answers Description. Correct answer: life',
                    untypedAnswer: null,
                    typedAnswers: [
                        {
                            id: 'typedAnswer1ForQuestion8',
                            text: 'life'
                        }
                    ],
                    myStatus: oldStatus,
                    ...standardQuestionData
                },
                {
                    id: 'typedAnswersQuestionWithPenaltyPoints',
                    codeInQuestionnaire: 9,
                    type: 'typedAnswers',
                    text: 'Question With Typed Answers And Penalty Points Description. Correct answers: learning, self-development',
                    untypedAnswer: null,
                    typedAnswers: [
                        {
                            id: 'typedAnswer1ForQuestion9',
                            text: 'learning'
                        },
                        {
                            id: 'typedAnswer2ForQuestion9',
                            text: 'self-development'
                        }
                    ],
                    myStatus: penaltyPointsStatus,
                    ...standardQuestionData
                },
            ]
    }
}