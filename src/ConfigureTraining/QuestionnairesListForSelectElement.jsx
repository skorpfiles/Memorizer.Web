import styles from './QuestionnairesListForSelectElement.module.css';

function QuestionnairesListForSelectElement(props) {

    return (
        <li>
            <div className={styles['line-container']}>
                <div className={styles['link-container']}>
                    <a href="#" onClick={()=>props.handleClick()}>{props.questionnaire.name}</a> <span className="font--notes">[Created by </span><span className="font--notes font--bold">{props.questionnaire.ownerName}</span><span className="font--notes">]</span>
                </div>
            </div>
        </li>
    )
}

export default QuestionnairesListForSelectElement;