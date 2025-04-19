import { useEffect, useState } from 'react';  
import { useSelector } from 'react-redux';
import { getCurrentLoggedTimeOfTrainingQuestionMilliseconds } from '../../../Utils/TrainingUtils';

function TrainingProgressTimer() {
    const questionId = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].id);
    const timerIsGoing = useSelector(state => state.trainingState.timerIsGoing);
    const trainingStartTime = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].trainingStartTime);
    const currentStageStartTime = useSelector(state => state.trainingState.currentStageStartTime);
    const currentStageTimeIsLimited = useSelector(state => state.trainingState.currentStageTimeIsLimited);
    const currentStageMaxTimeMilliseconds = useSelector(state => state.trainingState.currentStageMaxTimeMilliseconds);
    const answerTimeMilliseconds = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].answerTimeMilliseconds);

    const formatTime = (milliseconds) => {
        const millisecondsInOneHour = 3600000;

        if (milliseconds < millisecondsInOneHour) {
            const seconds = Math.floor(milliseconds / 1000) % 60;
            const minutes = Math.floor(milliseconds / 60000) % 60;

            return `${minutes.toString().padStart(1, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        else {
            const hours = Math.floor(milliseconds / 3600000) % 24;
            const minutes = Math.floor(milliseconds / 60000) % 60;

            return `${hours.toString().padStart(1, '0')}h:${minutes.toString().padStart(2, '0')}`;
        }
    };

    const [timerText, setTimerText] = useState(formatTime(0));

    useEffect(() => {
        setTimerText(formatTime(0));
    }, [questionId]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timerIsGoing) {
                setTimerText(formatTime(getCurrentLoggedTimeOfTrainingQuestionMilliseconds(answerTimeMilliseconds, currentStageStartTime,
                    currentStageTimeIsLimited, currentStageMaxTimeMilliseconds)));
            } else {
                if (trainingStartTime && answerTimeMilliseconds) {
                    setTimerText(formatTime(answerTimeMilliseconds));
                }
            }
        }, 500);

        return () => clearInterval(interval);
    }, [timerIsGoing, trainingStartTime, answerTimeMilliseconds, currentStageStartTime, currentStageTimeIsLimited, currentStageMaxTimeMilliseconds]);

    return (<div>{timerText}</div>);
}

export default TrainingProgressTimer;