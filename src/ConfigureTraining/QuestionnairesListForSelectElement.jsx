import styles from './QuestionnairesListForSelectElement.module.css';

function QuestionnairesListForSelectElement(props) {

    return (
        <li>
            <div className={styles['line-container']}>
                <button onClick={() => props.handleClick()} style={{
                    fontSize: "1rem",
                    color: "#002060",
                    width: "100%",
                    border: "0.15rem solid #8FAADC",
                    backgroundImage: "linear-gradient(to bottom, white 0%, white 50%, #DAE3F3 100%)",
                    textAlign: "left",
                    padding: "0.25rem 0.35rem",
                    marginBottom: "-0.15rem",
                    cursor:"pointer"
                }}>
                    <span style={{ fontSize: "1.25rem" }}>{props.questionnaire.name} <span className="font--notes" style={{ color: "black" }}>[Created by </span><span className="font--notes font--bold">{props.questionnaire.ownerName}</span><span className="font--notes">]</span></span>
                </button>
            </div>
        </li>
    )
}

export default QuestionnairesListForSelectElement;