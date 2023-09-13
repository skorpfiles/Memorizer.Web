import styles from './QuestionnairesListForSelectElement.module.css';

function QuestionnairesListForSelectElement(props) {

    return (
        <li>
            <button onClick={() => props.handleClick()} className={`tight-list-element overflow-ellipsis font--main-for-lists ${styles['padding']}`}>
                {props.questionnaire.name} <span className={styles['font--note-about-creator']}>[Created by </span><span className={`font--bold ${styles['font--note-about-creator']}`}>{props.questionnaire.ownerName}</span><span className={styles['font--note-about-creator']}>]</span>
            </button>
        </li>
    )
}

export default QuestionnairesListForSelectElement;