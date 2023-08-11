import SectionElement from './SectionElement';
import DeleteIcon from './delete.png';
import { useState } from 'react';

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
                    <div style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        borderRadius: "5px"
                    }}>
                    </div>
                )
                }
                {(mouseOnElement) && (

                    <div style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
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