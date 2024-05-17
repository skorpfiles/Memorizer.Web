import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
function TrainingProgressTimer() {
    const questionId = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].id);
    const timerIsGoing = useSelector(state => state.trainingState.timerIsGoing);
    const trainingStartTime = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].trainingStartTime);
    const resultAnswerTimeMilliseconds = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].answerTimeMilliseconds);

    const [timerText, setTimerText] = useState('0:00');

    useEffect(() => {
        setTimerText('0:00');
    }, [questionId]);

    useEffect(() => {
        const interval = setInterval(() => {

            if (timerIsGoing) {
                setTimerText(formatTime(Date.now() - trainingStartTime));
            }
            else {
                if (trainingStartTime && resultAnswerTimeMilliseconds) {
                    setTimerText(formatTime(resultAnswerTimeMilliseconds));
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [resultAnswerTimeMilliseconds, timerIsGoing, trainingStartTime]);

    const formatTime = (milliseconds) => {
        const seconds = Math.floor(milliseconds / 1000) % 60;
        const minutes = Math.floor(milliseconds / 60000) % 60;

        return `${minutes.toString()
            .padStart(1, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (<div>{timerText}</div>);
}

export default TrainingProgressTimer;