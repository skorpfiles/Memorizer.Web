function QuestionnairesListForSelectElement(props) {

    return (
        <li>
            <div className="QuestionnairesListForSelectElement-LineContainer">
                <div className="QuestionnairesListForSelectElement-Link">
                    <a href="#">{props.questionnaire.name}</a> <span className="Font-Notes">[Created by </span><span className="Font-Notes Font-Bold">{props.questionnaire.ownerName}</span><span className="Font-Notes">]</span>
                </div>
            </div>
        </li>
    )
}

export default QuestionnairesListForSelectElement;