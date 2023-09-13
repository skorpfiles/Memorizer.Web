import styles from './QuestionnairesListForSelectElement.module.css';

function QuestionnairesListForSelectElement(props) {

    return (
        <li>
            {/*<div className={styles['line-container']}>*/}
            {/*    <div className={styles['link-container']}>*/}
            {/*        <a href="#" onClick={()=>props.handleClick()}>{props.questionnaire.name}</a> <span className="font--notes">[Created by </span><span className="font--notes font--bold">{props.questionnaire.ownerName}</span><span className="font--notes">]</span>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={styles['line-container']}>
                <button onClick={() => props.handleClick()} style={{
                    fontSize: "1em",
                    color: "#002060",
                    width: "100%",
                    border: "0.15em solid #8FAADC",
                    backgroundImage: "linear-gradient(to bottom, white 0%, white 50%, #DAE3F3 100%)",
                    textAlign: "left",
                    padding: "0.25em 0.35em",
                    marginBottom: "-0.15em",
                    cursor:"pointer"
                }}>
                    <span style={{ fontSize: "1.25em" }}>{props.questionnaire.name} <span className="font--notes" style={{ color: "black" }}>[Created by </span><span className="font--notes font--bold">{props.questionnaire.ownerName}</span><span className="font--notes">]</span></span>
                </button>
            </div>
        </li>
    )
}

export default QuestionnairesListForSelectElement;