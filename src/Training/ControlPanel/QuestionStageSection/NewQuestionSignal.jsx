import styles from './NewQuestionSignal.module.css';

function NewQuestionSignal() {
    return (
        <div className={`font--notes font--bold ${styles['content']}`}>
            This is a new question!
        </div>
    )
}

export default NewQuestionSignal;