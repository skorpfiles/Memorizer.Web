import SectionElement from './SectionElement';
import DeleteIcon from './delete.png';
import { useState } from 'react';
import "./Questionnaire.css";

function Questionnaire(props) {
    const [mouseOnElement, setMouseOnElement] = useState(false);

    return (
        <SectionElement>
            <div
                onMouseEnter={() => setMouseOnElement(true)}
                onMouseLeave={() => setMouseOnElement(false)}
            >
                {props.name}
                {(mouseOnElement) && (
                    <div className="QuestionnairesListPanelQuestionnaire-OverButtonBackground">
                    </div>
                )
                }
                {(mouseOnElement) && (
                    <div className="QuestionnairesListPanelQuestionnaire-OverButtonIcon"
                        onClick={props.deleteQuestionnaire}
                    >
                        <a href="#">
                            <img src={DeleteIcon} alt="Delete" width="12px" />
                        </a>
                    </div>
                )
                }
            </div>
        </SectionElement>
    );
}

export default Questionnaire;